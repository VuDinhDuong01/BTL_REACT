/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useImperativeHandle, forwardRef, useState, useRef, ChangeEvent, useEffect } from 'react'
import { t } from "i18next";
import { EmojiClickData } from 'emoji-picker-react';

import { Dialog, DialogContent, DialogOverlay } from "../dialog";
import { Icons } from '../../../helps/icons';
import { useClickOutSide } from '../../../hooks/useClickOutSide';
import { useUploadImageMutation } from '../../../apis';
import { getProfileToLS } from '../../../helps';
import { cn } from '../../../helps/cn';
import { ShowGIF, handleShowPopup } from '../../show-gif';
import { DEFAULT_IMAGE_AVATAR } from '../../../helps/image-user-default';
import { ConvertSizeImagesPost } from '../../../helps/convert-size-image-post';
import { EmojiPickers, ShowEmoji } from '../../common/emoji-picker';
import { Button } from '../button';
import { listIcons } from '../../post-article';
import { Loading } from '../../../assets/icons/eye';
import { ToastMessage } from '../../../helps/toast-message';
import { useCreateTweetMutation } from '../../../apis/tweet';
import { DivideImageSize } from '../../../helps/divide-size-image';
import { formatMentionsAndHashtags } from '../../../helps/check-metions-or-hastags';
import { createPortal } from 'react-dom';
import { useCreateSharePostMutation } from '../../../apis/share-post';
import { contextProvider } from '../../../hooks';
import { Tweet } from '../../../types/tweet';

export type ShowPopupSharePost = {
    showPopup: () => void
};
interface PropsDialogComment {
    tweet_id: string
    users: { username: string, avatar: string, bio: string }
    id_user: string
}

const typeImages = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const typeVideo = ['mp4', 'webm']

export const PopupSharePost = forwardRef<ShowPopupSharePost, PropsDialogComment>(({ tweet_id, id_user }, ref) => {

    const { socket, tweet } = contextProvider()
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false)
    const refSharePost = useRef<any>(null)
    const [submit, setSubmit] = useState<boolean>(false)
    const showPopup = () => {
        setIsShowPopup(true)
    }

    const hiddenPopup = () => {
        setIsShowPopup(false)
    }
    useImperativeHandle(ref, () => ({
        showPopup: showPopup,
    }));

    useClickOutSide({
        onClickOutSide: () => {
            setIsShowPopup(false)
            setGif('')
            setText('')
            setFiles([])
        }, ref: refSharePost
    })

    const [uploadImages, { isLoading: isLoadingUploadImage }] = useUploadImageMutation()

    const mediaRef = useRef<HTMLInputElement>(null)
    const gifRef = useRef<handleShowPopup>(null)
    const emojiRef = useRef<ShowEmoji>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const [gif, setGif] = useState<string>('')
    const [text, setText] = useState('')
    const [createSharePost] = useCreateSharePostMutation()
    const [files, setFiles] = useState<{ link: string, file: File, name?: string, type?: string }[]>([])
    const handleIcon = (title: string) => () => {
        const actionMap = new Map([
            ['Media', () => mediaRef.current && mediaRef.current.click()],
            ['Emoji', () => emojiRef && emojiRef.current?.toggleShowEmoji()],
            ['Location', () => { }],
            ['Gif', () => gifRef.current && gifRef.current.handleShowPopup()],
        ]);
        const action = actionMap.get(title);
        if (action) {
            action()
        }
    };


    const handleFileMedia = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const arrayFile = Array.from(e.target.files);
            if (arrayFile.length > 2) {
                ToastMessage({
                    message: 'không được tải nhiều hơn 2 file',
                    status: 'error'
                })
                return;
            }
            setFiles(arrayFile.map(item => {
                return {
                    link: item.name,
                    file: item
                }
            }))
            if (mediaRef.current) {
                mediaRef.current.value = ''
            }
        }
    }

    const handleCloseGif = () => {
        setGif('')
    }

    const handleOnChange = (e: any) => {
        setText(e.target.value)
    };

    const handleShowEmojiPicker = (emojiData: EmojiClickData) => {
        setText(prev => (prev + emojiData.emoji
        ))
    }


    const [createShareTweet] = useCreateTweetMutation()

    const { avatar, user_id, username } = getProfileToLS() as { user_id: string, avatar: string, username: string }

    const handleCreateSharePost = async () => {

        if (submit) return
        setSubmit(true)
        let uploadImage: { image: string, type: number }[] = []

        try {
            if (files.length > 0) {
                const formData = new FormData();
                if (typeImages.includes(files[0].file.type)) {
                    for (let i = 0; i < files.length; i++) {
                        formData.append('image', files[i].file)
                    }
                    uploadImage = await uploadImages(formData).unwrap()
                }
            }
            const medias = (files.length > 0 && typeImages.includes(files[0].file?.type) && uploadImage.map(item => item.image)) as string[]

            const bodyRequest = {
                content: text,
                medias: files.length > 0 ? medias : gif !== '' ? [gif] : [],
                user_id: user_id,
                check_share: true,
                medias_share: (tweet as any)?.medias,
                username_share: (tweet as any)?.users?.name,
                content_share: (tweet as any)?.content,
                avatar_share: (tweet as any)?.users?.avatar,
                audience: 0,
                hashtags: [],
                mentions: [],
                postId: (tweet as any)?._id
            }
            const [res,] = await Promise.all([createShareTweet(bodyRequest).unwrap(), createSharePost({ postId: (tweet as any)?._id }).unwrap()]);
            if (res.message) {
                ToastMessage({ message: "Bạn đã chia sẻ thành công", status: 'success' })
                setIsShowPopup(false)
                setText('')
                setFiles([])
                setGif('')
            }
            if (res.message === 'create share post successfully') {
                socket?.emit('send_notification_share_post', {
                    status: 'share_post',
                    from: user_id,
                    to: id_user,
                    created_at: new Date,
                    tweet_id: tweet_id,
                    username: username,
                    avatar: avatar
                })
            }
        } catch (error: unknown) {
            console.log(error)
        } finally {
            setSubmit(false)
        }
    }
    useEffect(() => {
        if (textAreaRef.current) {
            (textAreaRef?.current as any).style.height = "auto";
            (textAreaRef.current as any).style.height = (textAreaRef.current as any).scrollHeight + "px";
        }
    }, [text])

    return (<div className=''>
        {
            isShowPopup && createPortal(<Dialog open={isShowPopup}>
                <DialogOverlay className='fixed inset-0 z-10 bg-black/50' />
                <DialogContent className=' w-full h-full  fixed inset-0  z-[9999] cursor-pointer'  >
                    <div className='max-h-[700px]  w-[650px] bg-white rounded-[20px] flex flex-col relative' ref={refSharePost} style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} >
                        <div className=' flex  ml-[10px] '><div className='mr-[15px] mt-[10px] cursor-pointer w-[30px] h-[30px] rounded-[50%] hover:bg-black3 flex items-center text-black justify-center hover:opacity-[80%]' onClick={hiddenPopup}><Icons.IoMdClose size={20} /></div></div>
                        <ShowGIF ref={gifRef} limit={50} setGif={setGif} />
                        <div className=" max-h-[500px] overflow-y-scroll flex  border-r-transparent border-l-transparent border-t-transparent">
                            <div className="w-[65px] ml-[10px] mt-[3px]">
                                <img src={avatar ? avatar : DEFAULT_IMAGE_AVATAR} className="w-[40px] h-[40px] rounded-[50%] " />
                            </div>
                            <div className="flex-1">
                                <div className='w-full relative'>
                                    <textarea ref={textAreaRef} placeholder={t('home.addComment')} className='w-full pr-[25px] font-fontFamily min-h-[30px] text-[20px] resize-none active:outline-none focus:outline-none rounded-lg border-none' value={text} onChange={handleOnChange} />
                                </div>
                                <div className={cn('pr-[10px]', {
                                    'mb-[10px] mt-[10px]': files.length > 0
                                })}>
                                    {
                                        files.length > 0 && typeImages.includes(files[0]?.file.type) &&
                                        ConvertSizeImagesPost({
                                            arrayImage: files.map(file => {
                                                return {
                                                    file: URL.createObjectURL(file.file),
                                                    link: file.link
                                                }
                                            }), setFiles, hImage1: 'h-[150px]'
                                        })
                                    }
                                    {
                                        Boolean(gif) && <div className='w-full relative'>
                                            <img src={gif as string} alt='gif' className='w-full object-cover rounded-lg h-[100px]' />
                                            <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center" onClick={handleCloseGif}><Icons.IoMdClose /></div>
                                        </div>
                                    }
                                </div>

                                {

                                    <div className='border-[1px] border-solid border-[#CFD9DE] rounded-lg mr-[20px]'>
                                        <div className='p-[10px]'>
                                            <div className="mt-[8px]">
                                                <div className=" w-full flex items-center font-fontFamily">
                                                    <img src={(tweet as Tweet)?.users?.avatar} alt='' className='w-[20px] h-[20px] rounded-[50%] object-cover mr-[10px]' />
                                                    <h2 className="text-[18px] text-black">{(tweet as any)?.users?.name}</h2>
                                                </div>
                                            </div>
                                            <div className="text-[16px] mt-[5px] font-fontFamily text-[#0F1419] leading-5">{formatMentionsAndHashtags((tweet as any)?.content as string)}</div>
                                        </div>
                                        <div className="w-full mt-[20px] cursor-pointer">
                                            {
                                                (tweet as any)?.medias?.length > 0 && !typeVideo.includes((tweet as any)?.medias[0]?.slice(-3)) && DivideImageSize({ arrayImage: (tweet as any)?.medias })
                                            }
                                            {
                                                (tweet as any)?.medias?.length > 0 && typeVideo.includes((tweet as any)?.medias[0]?.slice(-3)) && <video src={(tweet as any)?.medias[0]} className="w-full rounded-[20px]" controls />
                                            }
                                        </div>
                                    </div>
                                }

                            </div>

                        </div>
                        <div className="h-[60px] flex items-center border-r-transparent border-l-transparent border-b-transparent mt-[10px] px-[10px] border-solid border-t-[1px] border-[#CFD9DE]">
                            <div className="flex-1 flex items-center justify-between h-full relative">
                                <div className="w-full flex items-center">
                                    {
                                        listIcons.map(item => {
                                            return <div key={item.id} title={item.title} className={cn("w-[35px]   h-[35px] hover:bg-[#b9daef] text-green2 flex items-center justify-center rounded-[50%] cursor-pointer", {
                                                "hover:bg-transparent  text-[#afd2e8] cursor-not-allowed": files && files?.length > 0 && item.title === 'Gif',
                                                "hover:bg-transparent  text-[#afd2e8]  cursor-not-allowed": files && files?.length >= 4 && item.title === 'Media',
                                                'hover:bg-transparent text-[#afd2e8] cursor-not-allowed': Boolean(gif) && item.title === 'Media',
                                                'hover:bg-transparent text-[#afd2e8]  cursor-not-allowed': Boolean(gif) && item.title === 'Gif'
                                            })} onClick={handleIcon(item.title)}>
                                                {item.icons}
                                            </div>
                                        })
                                    }
                                    <input type="file" accept="image/*" multiple style={{ display: 'none ' }} ref={mediaRef} onChange={handleFileMedia} />
                                    <EmojiPickers handleShowEmojiPicker={handleShowEmojiPicker} ref={emojiRef} className=' absolute top-[-390px]' />
                                </div>
                                <Button
                                    onClick={handleCreateSharePost}
                                    className={`!text-[15px] my-[7px] ${isLoadingUploadImage ? '!cursor-not-allowed  opacity-[0.7]' : 'cursor-pointer'} !font-[700]  text-white font-fontFamily  m-auto  bg-green2 !rounded-[50px] flex items-center justify-center `}
                                    disabled={submit}
                                >{submit ? <Loading /> : t('sidebarLeft.post')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>, document.body)
        }
    </div>
    )
});



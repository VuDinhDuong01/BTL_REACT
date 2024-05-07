/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useImperativeHandle, forwardRef, useState, useRef, ChangeEvent, useContext } from 'react'
import { t } from "i18next";

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
import { listIcons, permissionViews } from '../../post-article';
import { Loading } from '../../../assets/icons/eye';
import { ToastMessage } from '../../../helps/toast-message';

import omit from 'lodash/omit'
import { useGetTweetDetailQuery } from '../../../apis/tweet';
import { EmojiClickData } from 'emoji-picker-react';
import { skipToken } from '@reduxjs/toolkit/query';
import { DivideImageSize } from '../../../helps/divide-size-image';
import { useCreateSharePostMutation } from '../../../apis/share-post';
import { ContextAPI } from '../../../hooks';
export type ShowPopupSharePost = {
    showPopup: () => void
};
interface PropsDialogComment {
    tweet_id: string
    users: { username: string, avatar: string, bio: string }
    id_user: string
}


const typeImages = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const typeVideo = ['video/mp4', 'video/webm']

export const PopupSharePost = forwardRef<ShowPopupSharePost, PropsDialogComment>(({ tweet_id, id_user }, ref) => {

    const { socket } = useContext(ContextAPI)
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
    const [createSharePost] = useCreateSharePostMutation()

    const mediaRef = useRef<HTMLInputElement>(null)
    const gifRef = useRef<handleShowPopup>(null)
    const permissionRef = useRef<HTMLDivElement>(null)

    const [showPermissionView, setShowPermissionView] = useState<{ title: string, icon: JSX.Element }>({
        title: t('home.everyone'),
        icon: <Icons.AiOutlineGlobal />
    })
    const emojiRef = useRef<ShowEmoji>(null)
    const [showPopupPermission, setPopupPermission] = useState<boolean>(false)
    const [gif, setGif] = useState<string>('')
    const [text, setText] = useState('')
    const contentEditableRef = useRef<any>(null)

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
            action();
        }
    };



    const handleShowPermissionView = (item: any) => () => {
        setPopupPermission(false)
        for (const element of permissionViews) {
            if (element.id === item.id) {
                setShowPermissionView(omit(element, ['id']))
            }
        }
    }

    const handleFileMedia = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const arrayFile = Array.from(e.target.files);
            if (arrayFile.length > 4) {
                ToastMessage({
                    message: 'không được tải quá 4 file',
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

    const handleTextChange = () => {
        const newText = contentEditableRef.current.innerText;
        setText(newText);
    };

    const handleShowEmojiPicker = (emojiData: EmojiClickData) => {
        setText(prev => (prev + emojiData.emoji
        ))
    }

    const handlePlaceholderClick = () => {
        contentEditableRef.current.focus();
    };

    const { avatar, user_id, username } = getProfileToLS() as { user_id: string, avatar: string, username: string }
    const { data: tweetDetail } = useGetTweetDetailQuery(tweet_id ? {
        tweet_id: tweet_id,
    } : skipToken)

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
                userId: user_id,
                postId: (tweetDetail as any)?.data[0]._id
            }
            const res = await createSharePost(bodyRequest).unwrap();
            if (res.message) {
                ToastMessage({ message: "Bạn đã chia sẻ thành công", status: 'success' })
                setIsShowPopup(false)
                setText('')
                setFiles([])
                setGif('')
                setShowPermissionView({
                    title: t('home.everyone'),
                    icon: <Icons.AiOutlineGlobal />
                })
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

    return (<div>
        {
            isShowPopup && <Dialog open={isShowPopup}>
                <DialogOverlay className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto py-16 grid place-items-center' />
                <DialogContent className=' w-full h-full  fixed inset-0  z-[99] cursor-pointer'  >
                    <div className='max-h-[700px]  w-[650px] bg-white rounded-[20px] flex flex-col relative' ref={refSharePost} style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} >
                        <div className=' flex  ml-[10px] '><div className='mr-[15px] mt-[10px] cursor-pointer w-[30px] h-[30px] rounded-[50%] hover:bg-black3 flex items-center text-black justify-center hover:opacity-[80%]' onClick={hiddenPopup}><Icons.IoMdClose size={20} /></div></div>

                        <ShowGIF ref={gifRef} limit={50} setGif={setGif} />
                        <div className=" max-h-[500px] overflow-y-scroll flex  border-r-transparent border-l-transparent border-t-transparent">
                            <div className="w-[65px] ml-[10px] mt-[3px]">
                                <img src={avatar ? avatar : DEFAULT_IMAGE_AVATAR} className="w-[40px] h-[40px] rounded-[50%] " />
                            </div>
                            <div className="flex-1">
                                <div className='w-full relative'>
                                    <div
                                        ref={contentEditableRef}
                                        contentEditable="true"
                                        onInput={handleTextChange}
                                        className='border-none outline-none font-fontFamily text-[20px] text-[#667581] w-full overflow-hidden whitespace-normal'
                                        style={{
                                            padding: '5px',
                                            minHeight: '50px',
                                            maxWidth: '530px',
                                            whiteSpace: 'pre-wrap',
                                            wordWrap: 'break-word',
                                        }}
                                    />
                                    {!text && (
                                        <div
                                            className=" absolute text-[#667581] top-[5px] left-[7px] font-fontFamily text-[25px]"
                                            onClick={handlePlaceholderClick}
                                        >
                                            {t('home.addComment')}
                                        </div>
                                    )}
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
                                <div className='w-full cursor-pointer'>
                                    <div className=''>
                                        <div className=" inline-block px-[8px] py-[2px]  mb-[10px] cursor-pointer items-center  text-green2 hover:bg-[#bbe3ed] rounded-[50px]" onClick={() => setPopupPermission(!showPopupPermission)}>
                                            <div className='flex items-center'>
                                                {showPermissionView.icon}
                                                <p className="ml-[5px] text-[14px] font-fontFamily font-[700] text-green2 ">{showPermissionView.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        showPopupPermission && <div ref={permissionRef} className=" flex items-center justify-center bg-white !px-0 fixed max-w-[300px] py-[8px] rounded-xl" style={{ boxShadow: "0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)" }}>
                                            <div>
                                                <div className="mb-[20px] mt-[10px] px-[10px]">
                                                    <h3 className="text-[17px] mb-[10px] font-fontFamily">  {t('home.whoCanReply')}</h3>
                                                    <p className="text-[14px] font-fontFamily"> {t('home.chooseUserReply')}</p>
                                                </div>
                                                <div className="w-full">
                                                    {
                                                        permissionViews.map((item) => {
                                                            return <div key={item.id} className="w-full flex items-center  py-[8px] px-[10px] cursor-pointer hover:bg-white1" onClick={handleShowPermissionView(item)}>
                                                                <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                                                    {item.icon}
                                                                </div>
                                                                <h3 className="text-[17px] font-fontFamily ">{item.title}</h3>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='border-[1px] border-solid border-[#CFD9DE] rounded-lg mr-[20px]'>
                                    <div className='p-[10px]'>
                                        <div className="mt-[8px]">
                                            <div className=" w-full flex items-center font-fontFamily">
                                                <img src={(tweetDetail as any).data[0].users.avatar} alt='' className='w-[20px] h-[20px] rounded-[50%] object-cover mr-[10px]' />
                                                <h2 className="text-[18px] text-black">{(tweetDetail as any).data[0].users.name}</h2>
                                            </div>
                                        </div>
                                        <div className="text-[16px] mt-[5px] font-fontFamily text-[#0F1419] leading-5">{(tweetDetail as any).data[0].content}</div>
                                    </div>
                                    <div className="w-full mt-[20px] cursor-pointer">
                                        {
                                            (tweetDetail as any)?.data[0].medias?.length > 0 && !typeVideo.includes((tweetDetail as any)?.data[0]?.medias[0].slice(-3)) && DivideImageSize({ arrayImage: (tweetDetail as any)?.data[0].medias })
                                        }
                                        {
                                            (tweetDetail as any)?.data[0].medias?.length > 0 && typeVideo.includes((tweetDetail as any)?.data[0]?.medias[0].slice(-3)) && <video src={(tweetDetail as any)?.data[0].medias[0]} className="w-full rounded-[20px]" controls />
                                        }
                                    </div>
                                </div>
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
            </Dialog>
        }
    </div>
    )
});


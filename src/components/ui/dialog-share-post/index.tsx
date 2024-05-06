/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useImperativeHandle, forwardRef, useState, useRef, useContext, useEffect, ChangeEvent } from 'react'
import { t } from "i18next";

import { Dialog, DialogContent, DialogOverlay } from "../dialog";
import { Icons } from '../../../helps/icons';
// import { Images } from '../../../assets/images';
// import { convertDateToHours } from '../../../helps/convert-date-to-hour';
// import { InputPost } from '../../common/input-post';
import { useClickOutSide } from '../../../hooks/useClickOutSide';

import { useUploadImageMutation, useUploadVideoMutation } from '../../../apis';
import { getProfileToLS, regex } from '../../../helps';

import { cn } from '../../../helps/cn';

import { ContextAPI } from '../../../hooks';

import { ShowGIF, handleShowPopup } from '../../show-gif';
import { DEFAULT_IMAGE_AVATAR, NOT_IMAGE } from '../../../helps/image-user-default';
import { ConvertSizeImagesPost } from '../../../helps/convert-size-image-post';
import { EmojiPickers, ShowEmoji } from '../../common/emoji-picker';
import { Button } from '../button';
import { listIcons, permissionViews } from '../../post-article';
import { Loading } from '../../../assets/icons/eye';
import { ToastMessage } from '../../../helps/toast-message';
import { checkHashTagsOrMentions } from '../../../helps/check-metions-or-hastags';
import omit from 'lodash/omit'
import { useCreateTweetMutation, useGetTweetDetailQuery } from '../../../apis/tweet';
import { EmojiClickData } from 'emoji-picker-react';
import { skipToken } from '@reduxjs/toolkit/query';
import { DivideImageSize } from '../../../helps/divide-size-image';
export type ShowPopupSharePost = {
    showPopup: () => void;
};
interface PropsDialogComment {
    tweet_id: string
    users: { username: string, avatar: string, bio: string }
    id_user: string
}


const typeImages = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const typeVideo = ['video/mp4', 'video/webm']

export const PopupSharePost = forwardRef<ShowPopupSharePost, PropsDialogComment>(({ tweet_id, id_user, users }, ref) => {


    const [isShowPopup, setIsShowPopup] = useState<boolean>(false)

    const { setIsShowInputRepliesComment } = useContext(ContextAPI)


    // const { data: getMe } = useGetMeQuery(user_id ? {
    //     user_id: user_id
    // } : skipToken)
    const showPopup = () => {
        setIsShowPopup(true)
    }

    const hiddenPopup = () => {
        setIsShowPopup(false)
        // SetFile('')
        // setRepliesContent('')
        // setContent('')
        // setFileRepliesComment('')
        setIsShowInputRepliesComment('')
    }
    useImperativeHandle(ref, () => ({
        showPopup: showPopup
    }));


    // useClickOutSide({
    //     onClickOutSide: () => {
    //         setIsShowPopup(false)
    //         SetFile('')
    //         setRepliesContent('')
    //         setContent('')
    //         setIsShowInputRepliesComment('')
    //         setFileRepliesComment('')
    //     }, ref: refPopComment
    // })

    // const handleRepliesComment = (comment_id: string) => {
    //     setIsShowInputRepliesComment(comment_id)
    // }




    // const handleFilerIcon = (listIcon: LikeComment[]) => {
    //     const icons = listIcon.map(icon => icon.icon)
    //     return Array.from(new Set(icons))
    // }

    // const renderColorLike = (icon: string, like_comment: LikeComment[]) => {
    //     return like_comment?.some(item => item.user_id === user_id && item.icon === icon)
    // }



    const [uploadImages, { isLoading: isLoadingUploadImage }] = useUploadImageMutation()
    const [uploadVideo, { isLoading: isLoadingUploadVideo }] = useUploadVideoMutation()
    const [createTweet, { isLoading }] = useCreateTweetMutation()
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const mediaRef = useRef<HTMLInputElement>(null)
    const gifRef = useRef<handleShowPopup>(null)
    const permissionRef = useRef<HTMLDivElement>(null)
    // const { handleSubmit } = useForm({
    //     defaultValues: {
    //         textPost: ''
    //     }
    // })

    const [showPermissionView, setShowPermissionView] = useState<{ title: string, icon: JSX.Element }>({
        title: t('home.everyone'),
        icon: <Icons.AiOutlineGlobal />
    })
    const emojiRef = useRef<ShowEmoji>(null)
    const [audience, setAudience] = useState<number>(0)
    const [showPopupPermission, setPopupPermission] = useState<boolean>(false)
    useClickOutSide({ onClickOutSide: () => setPopupPermission(false), ref: permissionRef })
    const [gif, setGif] = useState<string>('')
    const [text, setText] = useState('')
    const contentEditableRef = useRef<any>(null)
    // const mentions = checkHashTagsOrMentions({ arrayText: text, char: '@' })
    // const hashtags = checkHashTagsOrMentions({ arrayText: text, char: '#' })

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
        setAudience(item.audience)
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

    const handleShowEmojiPicker = (emojiData: EmojiClickData) => {
        setText(prev => (prev + emojiData.emoji))
    }

    const handleTextChange = () => {
        const newText = contentEditableRef.current.innerText;
        setText(newText);
    };

    // useEffect(() => {
    //     highlightHashtags();
    // }, [text]);

    const moveCaretToEnd = () => {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(contentEditableRef.current);
        range.collapse(false);

        selection?.removeAllRanges();
        selection?.addRange(range);
    };

    // useEffect(() => {
    //     highlightHashtags();
    //     moveCaretToEnd();
    // }, [text]);

    // const highlightHashtags = () => {
    //     const highlightedText = text?.replace(regex.checkHashtagOrMention, (match) => `<span style="color: #6ABDF5;">${match}</span>`);
    //     if (contentEditableRef?.current) {
    //         contentEditableRef.current.innerHTML = highlightedText
    //     }
    // };

    const handlePlaceholderClick = () => {
        contentEditableRef.current.focus();
    };

    const { avatar } = getProfileToLS() as { user_id: string, avatar: string, username: string }
    const { data: tweetDetail } = useGetTweetDetailQuery(tweet_id ? {
        tweet_id: tweet_id,
    } : skipToken)

    // const onSubmit = (handleSubmit(async () => {
    //     let uploadImage: { image: string, type: number }[] = []
    //     let uploadVideos: { path: string, message: string } = { path: '', message: '' }
    //     try {
    //         if (files.length > 0) {
    //             const formData = new FormData();
    //             if (typeImages.includes(files[0].file.type)) {
    //                 for (let i = 0; i < files.length; i++) {
    //                     formData.append('image', files[i].file)
    //                 }
    //                 uploadImage = await uploadImages(formData).unwrap()
    //             } else {
    //                 formData.append('video', files[0].file)
    //                 uploadVideos = await uploadVideo(formData).unwrap()
    //             }

    //         }
    //         const medias = files.length > 0 && typeImages.includes(files[0].file?.type) ?
    //             uploadImage.map(item => item.image) : files.length > 0 &&
    //                 typeVideo.includes(files[0].file?.type) ? [uploadVideos.path] : []
    //         const bodyRequest = {
    //             content: text,
    //             medias: files.length > 0 ? medias : gif !== '' ? [gif] : [],
    //             user_id,
    //             audience,
    //             hashtags,
    //             mentions
    //         }
    //         const res = await createTweet(bodyRequest).unwrap();
    //         setText('')
    //         setFiles([])
    //         setGif('')
    //         setShowPermissionView({
    //             title: t('home.everyone'),
    //             icon: <Icons.AiOutlineGlobal />
    //         })
    //         isLoading || isLoadingUploadImage || isLoadingUploadVideo && setIsDisable(true)

    //         if (res.message === 'create tweet successfully') {
    //             if ((res.data as any)?.hasOwnProperty('tweet_id') && (res.data as any).user_ids.length > 0) {
    //                 for (let i = 0; i < (res.data as any).user_ids.length; i++) {
    //                     socket?.emit('send_notification_mentions', {
    //                         status: 'mentions',
    //                         from: user_id,
    //                         to: (res.data as any).user_ids[i],
    //                         created_at: new Date,
    //                         tweet_id: (res.data as any).tweet_id,
    //                         username: username,
    //                     })
    //                 }
    //             }
    //         }
    //     } catch (error: unknown) {
    //         console.log(error)
    //     }
    // }))

    // useEffect(() => {
    //     gif.length <= 0 && text === '' && files.length <= 0 ? setIsDisable(true) : setIsDisable(false)
    // }, [gif, text, files])


    // useEffect(() => {
    //     if (files.length > 0 && typeVideo.includes(files[0].file.type)) {
    //         const url = URL.createObjectURL(files[0].file);
    //         setVideoUrl(url);
    //     }
    // }, [files])
    return (<div>
        {
            isShowPopup && <Dialog open={isShowPopup}>
                <DialogOverlay className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto py-16 grid place-items-center' />
                <DialogContent className=' w-full cursor-default h-full  fixed inset-0  z-[99]' >
                    <div className='max-h-[700px]  w-[650px] bg-white rounded-[20px] flex flex-col relative' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} >
                        <div className=' flex  ml-[10px] '><div className='mr-[15px] mt-[10px] cursor-pointer w-[30px] h-[30px] rounded-[50%] hover:bg-black3 flex items-center text-black justify-center hover:opacity-[80%]' onClick={hiddenPopup}><Icons.IoMdClose size={20} /></div></div>

                        <form className="w-full  mt-[20px] flex-1 " >
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
                                                Thêm bình luận

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
                                                }), setFiles, hImage1:'h-[150px]'
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
                                        <input type="file" multiple style={{ display: 'none ' }} ref={mediaRef} onChange={handleFileMedia} />
                                        <EmojiPickers handleShowEmojiPicker={handleShowEmojiPicker} ref={emojiRef} className=' absolute top-[40px]' />
                                    </div>
                                    <Button
                                        className={`!text-[15px] my-[7px] ${isLoading || isLoadingUploadImage || isLoadingUploadVideo ? '!cursor-not-allowed  opacity-[0.7]' : 'cursor-pointer'} ${isDisable ? '!cursor-not-allowed opacity-[0.7]' : 'cursor-pointer'} !font-[700]  text-white font-fontFamily  m-auto  bg-green2 !rounded-[50px] flex items-center justify-center `}
                                        disabled={isDisable}>{isLoading || isLoadingUploadImage || isLoadingUploadVideo ? <Loading /> : t('sidebarLeft.post')}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        }
    </div>
    )
});



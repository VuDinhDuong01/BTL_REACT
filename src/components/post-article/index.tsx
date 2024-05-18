/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent, useRef, useState, useEffect, useContext } from 'react'
import { EmojiClickData } from 'emoji-picker-react';
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { t } from "i18next";
import { createPortal } from 'react-dom'

import { Icons } from "../../helps/icons"
import { Button } from "../ui/button"
import { ShowGIF, handleShowPopup } from '../show-gif';
import { cn } from '../../helps/cn';
import { useClickOutSide } from '../../hooks/useClickOutSide';
import { ConvertSizeImagesPost } from '../../helps/convert-size-image-post';
import { checkHashTagsOrMentions } from '../../helps/check-metions-or-hastags';
import { getProfileToLS, regex } from '../../helps';
import { useUploadImageMutation, useUploadVideoMutation } from '../../apis';
import { useCreateTweetMutation } from '../../apis/tweet';
import { Loading } from '../../assets/icons/eye';
import { EmojiPickers, ShowEmoji } from '../common/emoji-picker';
import { DEFAULT_IMAGE_AVATAR } from '../../helps/image-user-default';
import { ToastMessage } from '../../helps/toast-message';
import { ContextAPI } from '../../hooks';

export const listIcons = [
    {
        id: 1,
        icons: <Icons.GoFileMedia size={20} />,
        title: 'Media'
    },
    {
        id: 2,
        icons: <Icons.HiOutlineGif size={20} />,
        title: 'Gif'
    },
    {
        id: 3,
        icons: <Icons.MdOutlineEmojiEmotions size={20} />,
        title: 'Emoji'
    },
    {
        id: 4,
        icons: <Icons.CiLocationOn size={20} />,
        title: 'Location'
    },
]

const typeImages = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const typeVideo = ['video/mp4', 'video/webm']
interface permissionViews {
    id: number,
    title: string,
    icon: JSX.Element,
    audience: number
}

export const permissionViews: permissionViews[] = [
    {
        id: 1,
        title: t('home.everyone'),
        icon: <Icons.AiOutlineGlobal />,
        audience: 0,
    },
    {
        id: 2,
        title: t('home.accountsYouFollow'),
        icon: <Icons.LuUserCheck />,
        audience: 1,
    },
    {
        id: 3,
        title: t('home.verifyAccounts'),
        icon: <Icons.IoSettingsOutline />,
        audience: 2,
    },
    {
        id: 4,
        title: t('home.onlyAccountsYouMention'),
        icon: <Icons.SiOnlyoffice />,
        audience: 3
    },
]

export const PostArticle = () => {
    const { socket } = useContext(ContextAPI)
    const [uploadImages, { isLoading: isLoadingUploadImage }] = useUploadImageMutation()
    const [uploadVideo, { isLoading: isLoadingUploadVideo }] = useUploadVideoMutation()
    const [createTweet, { isLoading }] = useCreateTweetMutation()
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const [videoUrl, setVideoUrl] = useState('');
    const mediaRef = useRef<HTMLInputElement>(null)
    const gifRef = useRef<handleShowPopup>(null)
    const permissionRef = useRef<HTMLDivElement>(null)
    const { handleSubmit } = useForm({
        defaultValues: {
            textPost: ''
        }
    })

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
    const mentions = checkHashTagsOrMentions({ arrayText: text, char: '@' })
    const hashtags = checkHashTagsOrMentions({ arrayText: text, char: '#' })

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



    const handleShowPermissionView = (item: permissionViews) => () => {
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

    const moveCaretToEnd = () => {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(contentEditableRef.current);
        range.collapse(false);

        selection?.removeAllRanges();
        selection?.addRange(range);
    };

    useEffect(() => {
        highlightHashtags();
        moveCaretToEnd();
    }, [text]);

    const highlightHashtags = () => {
        const highlightedText = text?.replace(regex.checkHashtagOrMention, (match) => `<span style="color: #6ABDF5;">${match}</span>`);
        if (contentEditableRef?.current) {
            contentEditableRef.current.innerHTML = highlightedText
        }
    };

    const handlePlaceholderClick = () => {
        contentEditableRef.current.focus();
    };

    const profile = getProfileToLS() as { user_id?: string, avatar?: string, username?: string }

    const onSubmit = (handleSubmit(async () => {
        let uploadImage: { image: string, type: number }[] = []
        let uploadVideos: { path: string, message: string } = { path: '', message: '' }
        try {
            if (files.length > 0) {
                const formData = new FormData();
                if (typeImages.includes(files[0].file.type)) {
                    for (let i = 0; i < files.length; i++) {
                        formData.append('image', files[i].file)
                    }
                    uploadImage = await uploadImages(formData).unwrap()
                } else {
                    formData.append('video', files[0].file)
                    uploadVideos = await uploadVideo(formData).unwrap()
                }

            }
            const medias = files.length > 0 && typeImages.includes(files[0].file?.type) ?
                uploadImage.map(item => item.image) : files.length > 0 &&
                    typeVideo.includes(files[0].file?.type) ? [uploadVideos.path] : []
            const bodyRequest = {
                content: text,
                medias: files.length > 0 ? medias : gif !== '' ? [gif] : [],
                user_id: profile?.user_id as string,
                audience,
                hashtags,
                mentions,
            }
            const res = await createTweet(bodyRequest).unwrap();
            setText('')
            setFiles([])
            setGif('')
            setShowPermissionView({
                title: t('home.everyone'),
                icon: <Icons.AiOutlineGlobal />
            })
            isLoading || isLoadingUploadImage || isLoadingUploadVideo && setIsDisable(true)

            if (res.message === 'create tweet successfully') {
                if ((res.data as any).hasOwnProperty('tweet_id') && (res.data as any).user_ids.length > 0) {
                    for (let i = 0; i < (res.data as any).user_ids.length; i++) {
                        socket?.emit('send_notification_mentions', {
                            status: 'mentions',
                            from: profile?.user_id,
                            to: (res.data as any).user_ids[i],
                            created_at: new Date,
                            tweet_id: (res.data as any).tweet_id,
                            username: profile?.username,
                        })
                    }
                }
            }
        } catch (error: unknown) {
            console.log(error)
        }
    }))

    useEffect(() => {
        gif.length <= 0 && text === '' && files.length <= 0 ? setIsDisable(true) : setIsDisable(false)
    }, [gif, text, files])

    useEffect(() => {
        if (files.length > 0 && typeVideo.includes(files[0].file.type)) {
            const fileSizeInBytes = files[0].file?.size;
            const fileSizeInMegabytes = fileSizeInBytes ? fileSizeInBytes / (1024 * 1024) : 0; // Chia cho 1,048,576 để chuyển đổi từ byte sang megabyte

            if (fileSizeInMegabytes > 5) {
                ToastMessage({
                    message: 'Không được upload file có kích thước lớn hơn 5 MB',
                    status: 'error'
                });
                setVideoUrl('')
            } else {
                const url = URL.createObjectURL(files[0].file);
                setVideoUrl(url);
            }

        }
    }, [files])

    return (
        <form className="w-[611px] min-h-[155px] mt-[70px]" onSubmit={onSubmit}>
            <ShowGIF ref={gifRef} limit={50} setGif={setGif} />
            <div className="w-full  min-h-[100px] flex border-b-[1px] border-solid border-white1 border-r-transparent border-l-transparent border-t-transparent">
                <div className="w-[65px] ml-[10px] mt-[3px]">
                    <img src={profile?.avatar ? profile?.avatar : DEFAULT_IMAGE_AVATAR} className="w-[40px] h-[40px] rounded-[50%] " />
                </div>
                <div className="flex-1">
                    <div className='w-full '>
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
                                className="w-full  text-[#667581] mt-[-50px] ml-[5px]   font-fontFamily text-[25px] "
                                onClick={handlePlaceholderClick}
                            >
                                {
                                    `${profile?.username} ơi, ${t('home.whatIsHappening')}`
                                }

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
                                }), setFiles
                            })
                        }
                        {
                            files.length > 0 && typeVideo.includes(files[0].file.type) && videoUrl !== '' &&
                            <div className='w-full relative '>
                                <video
                                    className='w-full rounded-xl'
                                    height="300px"
                                    controls
                                    src={videoUrl}
                                />
                                <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center" onClick={() => setFiles([])}><Icons.IoMdClose /></div>
                            </div>
                        }
                        {
                            Boolean(gif) && <div className='w-full relative'>
                                <img src={gif as string} alt='gif' className='w-full object-cover rounded-lg h-[200px]' />
                                <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center" onClick={handleCloseGif}><Icons.IoMdClose /></div>
                            </div>
                        }
                    </div>
                    
                       <div className='w-full  cursor-pointer'>
                            <div className=''>
                                <div className=" inline-block px-[8px] py-[2px]  mb-[10px] cursor-pointer items-center  text-green2 hover:bg-[#bbe3ed] rounded-[50px]" onClick={() => setPopupPermission(!showPopupPermission)}>
                                    <div className='flex items-center mt-[10px]'>
                                        {showPermissionView.icon}
                                        <p className="ml-[5px] text-[14px] font-fontFamily font-[700] text-green2 ">{showPermissionView.title}</p>
                                    </div>
                                </div>
                            </div>
                            {
                                showPopupPermission && <div ref={permissionRef} className=" flex items-center justify-center bg-white !px-0 fixed max-w-[300px] py-[8px] rounded-xl z-[99]" style={{ boxShadow: "0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)" }}>
                                    {
                                        <div className=''>
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
                                    }
                                   
                                </div>
                            }
                        </div>
                    


                </div>
            </div>
            <div className="w-[611px] h-[55px] flex items-center border-b-[1px] border-solid border-white1 border-r-transparent border-l-transparent border-t-transparent">
                <div className="w-[65px] "></div>
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
                        className={`!text-[15px] ${isLoading || isLoadingUploadImage || isLoadingUploadVideo ? '!cursor-not-allowed  opacity-[0.7]' : 'cursor-pointer'} ${isDisable ? '!cursor-not-allowed opacity-[0.7]' : 'cursor-pointer'} !font-[700]  text-white font-fontFamily  m-auto  bg-green2 !rounded-[50px] flex items-center justify-center `}
                        disabled={isDisable}>{isLoading || isLoadingUploadImage || isLoadingUploadVideo ? <Loading /> : t('sidebarLeft.post')}
                    </Button>
                </div>
            </div>
        </form>
    )
}
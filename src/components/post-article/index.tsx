/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent, useRef, useState, useEffect } from 'react'
import { EmojiClickData } from 'emoji-picker-react';
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'

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
import { VideoPlayer } from '../video';
import { DEFAULT_IMAGE_AVATAR } from '../../helps/image-user-default';

const listIcons = [
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

const typeImages = ['image/png', 'image/jpg', 'image/jpeg']
const typeVideo = ['video/mp4', 'video/webm']
interface permissionViews {
    id: number,
    title: string,
    icon: JSX.Element,
    audience: number
}

const permissionViews: permissionViews[] = [
    {
        id: 1,
        title: 'Everyone can reply',
        icon: <Icons.AiOutlineGlobal />,
        audience: 0,
    },
    {
        id: 2,
        title: 'Accounts you follow',
        icon: <Icons.LuUserCheck />,
        audience: 1,
    },
    {
        id: 3,
        title: 'Verified accounts',
        icon: <Icons.IoSettingsOutline />,
        audience: 2,
    },
    {
        id: 4,
        title: 'Only accounts you mention',
        icon: <Icons.SiOnlyoffice />,
        audience: 3
    },
]

export const PostArticle = () => {
    const [uploadImages] = useUploadImageMutation()
    const [uploadVideo] = useUploadVideoMutation()
    const [createTweet, { isLoading }] = useCreateTweetMutation()
    const mediaRef = useRef<HTMLInputElement>(null)
    const gifRef = useRef<handleShowPopup>(null)
    const permissionRef = useRef<HTMLDivElement>(null)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            textPost: ''
        }
    })

    const [showPermissionView, setShowPermissionView] = useState<{ title: string, icon: JSX.Element }>({
        title: 'Everyone can reply',
        icon: <Icons.AiOutlineGlobal />
    })
    const emojiRef = useRef<ShowEmoji>(null)
    const [audience, setAudience] = useState<number>(0)
    const [showPopupPermission, setPopupPermission] = useState<boolean>(false)
    useClickOutSide({ onClickOutSide: () => setPopupPermission(false), ref: permissionRef })
    const [gif, setGif] = useState<string | File>('')
    const [text, setText] = useState('');
    const contentEditableRef = useRef<any>(null);
    const mentions = checkHashTagsOrMentions({ arrayText: text, char: '@' })
    const hashtags = checkHashTagsOrMentions({ arrayText: text, char: '#' })

    const [files, setFiles] = useState<File[]>([])

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
            setFiles(arrayFile)
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

    useEffect(() => {
        highlightHashtags();
    }, [text]);

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

    const {user_id, avatar} = getProfileToLS() as {user_id: string , avatar: string }

    const onSubmit = (handleSubmit(async () => {
        let uploadImage: { image: string, type: number }[] = []
        let uploadVideos: { image: string, type: number }[] = []
        try {
            if (files.length > 0) {
                const formData = new FormData();
                if (typeImages.includes(files[0].type)) {
                    for (let i = 0; i < files.length; i++) {
                        formData.append('image', files[i])
                    }
                    uploadImage = await uploadImages(formData).unwrap()
                } else {
                    formData.append('video', files[0])
                    uploadVideos = await uploadVideo(formData).unwrap()
                }

            }
            const medias = typeImages.includes(files[0].type) ? uploadImage.map(item => item.image) : [uploadVideos[0].image]
            const bodyRequest = {
                content: text,
                medias: files.length > 0 ? medias : [gif],
                user_id,
                audience,
                hashtags,
                mentions
            }
            await createTweet(bodyRequest).unwrap();
            setText('')
            setFiles([])
            setGif('')
            setShowPermissionView({
                title: 'Everyone can reply',
                icon: <Icons.AiOutlineGlobal />
            })
        } catch (error: unknown) {
            console.log(error)
        }
    }))
    console.log(files)

    return (
        <form className="w-[611px] min-h-[155px] mt-[70px]" onSubmit={onSubmit}>

            <ShowGIF ref={gifRef} limit={50} setGif={setGif} />
            <div className="w-full  min-h-[100px] flex border-b-[1px] border-solid border-white1 border-r-transparent border-l-transparent border-t-transparent">
                <div className="w-[65px] ml-[10px] mt-[3px]">
                    <img src={avatar ? avatar :DEFAULT_IMAGE_AVATAR} className="w-[40px] h-[40px] rounded-[50%] " />
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
                                className="w-full absolute text-[#667581] top-[5px] left-[7px] font-fontFamily text-[25px]"
                                onClick={handlePlaceholderClick}
                            >
                                What is happening?
                            </div>
                        )}
                    </div>
                    <div className={cn('pr-[10px]', {
                        'mb-[10px] mt-[10px]': files.length > 0
                    })}>
                        {
                            files.length > 0 && typeImages.includes(files[0]?.type) &&
                            ConvertSizeImagesPost({ arrayImage: files.map(file => URL.createObjectURL(file)), setFiles })
                        }
                        {
                            files.length > 0 && typeVideo.includes(files[0]?.type) &&
                            <div className='w-full relative'>
                                <video controls className='w-full rounded-lg'>
                                    <source src={URL.createObjectURL(files[0])} type={files[0].type} />
                                </video>
                                <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center" onClick={() => setFiles([])}><Icons.IoMdClose /></div>
                            </div>
                        }
                        {
                            Boolean(gif) && <div className='w-full relative'>
                                <img src={gif as string } alt='gif' className='w-full object-cover rounded-lg h-[200px]' />
                                <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center" onClick={handleCloseGif}><Icons.IoMdClose /></div>
                            </div>
                        }
                    </div>
                    <div className='w-full relative cursor-pointer'>
                        <div className=''>
                            <div className=" inline-block px-[8px] py-[2px]  mb-[10px] cursor-pointer items-center  text-green2 hover:bg-[#bbe3ed] rounded-[50px]" onClick={() => setPopupPermission(!showPopupPermission)}>
                                <div className='flex items-center'>
                                    {showPermissionView.icon}
                                    <p className="ml-[5px] text-[14px] font-fontFamily font-[700] text-green2 ">{showPermissionView.title}</p>
                                </div>
                            </div>
                        </div>
                        {
                            showPopupPermission && <div ref={permissionRef} className=" flex items-center justify-center bg-white !px-0 absolute left-[-11%] max-w-[300px] py-[8px] rounded-xl" style={{ boxShadow: "0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)" }}>
                                <div>
                                    <div className="mb-[20px] mt-[10px] px-[10px]">
                                        <h3 className="text-[17px] mb-[10px] font-fontFamily">Who can reply?</h3>
                                        <p className="text-[14px] font-fontFamily">Choose who can reply to this post. Anyone mentioned can always reply</p>
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
                </div>
            </div>
            <div className="w-[611px] h-[55px] flex items-center border-b-[1px] border-solid border-white1 border-r-transparent border-l-transparent border-t-transparent">
                <div className="w-[65px] "></div>
                <div className="flex-1 flex items-center justify-between h-full ">
                    <div className="w-full flex items-center relative">
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
                        <EmojiPickers handleShowEmojiPicker={handleShowEmojiPicker} ref={emojiRef} className='w-full absolute top-[44px] z-[9]' />
                    </div>
                    <Button className={`!text-[15px] ${isLoading ? 'cursor-not-allowed  opacity-[0.7]' : 'cursor-pointer'} cursor-pointer !font-[700]  text-white font-fontFamily mr-[15px] bg-green2  px-[15px] !rounded-[50px] flex items-center justify-center`}>{isLoading ? <Loading /> : 'Post'}</Button>
                </div>
            </div>

        </form>
    )
}
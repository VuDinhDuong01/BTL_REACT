/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent, useRef, useState } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'

import { Icons } from "../../helps/icons"
import { Button } from "../ui/button"
import { Images } from "../../assets/images"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popver"
import { ShowGIF, handleShowPopup } from '../show-gif';
import { cn } from '../../helps/cn';
import { useClickOutSide } from '../../hooks/useClickOutSide';
import { ConvertSizeImagesPost } from '../../helps/convert-size-image-post';

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

const permissionViews = [
    {
        id: 1,
        title: 'Everyone can reply',
        icon: <Icons.AiOutlineGlobal />
    },
    {
        id: 2,
        title: 'Accounts you follow',
        icon: <Icons.LuUserCheck />
    },
    {
        id: 3,
        title: 'Verified accounts',
        icon: <Icons.IoSettingsOutline />
    },
    {
        id: 4,
        title: 'Only accounts you mention',
        icon: <Icons.SiOnlyoffice />
    },
]

// const MAX_CHAR = 500

export const PostArticle = () => {

    const mediaRef = useRef<HTMLInputElement>(null)
    const gifRef = useRef<handleShowPopup>(null)
    const emojiRef = useRef<any>(null)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            textPost: ''
        }
    })

    const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false)
    const [showPermissionView, setShowPermissionView] = useState<{ title: string, icon: JSX.Element }>({
        title: 'Everyone can reply',
        icon: <Icons.AiOutlineGlobal />
    })
    const [countCharPost, setCountCharPost] = useState<number>(0)
    const [showPopupPermission, setPopupPermission] = useState<boolean>(false)
    const [gif, setGif] = useState<string>('')
    const [textPost, setTextPost] = useState<string>('')
    const [files, setFiles] = useState<string[]>([])

    const handleIcon = (title: string) => () => {
        const actionMap = new Map([
            ['Media', () => mediaRef.current && mediaRef.current.click()],
            ['Emoji', () => setIsShowEmoji(!isShowEmoji)],
            ['Location', () => { }],
            ['Gif', () => gifRef.current && gifRef.current.handleShowPopup()],
        ]);

        const action = actionMap.get(title);
        if (action) {
            action();
        } else {
            //
        }
    };

    useClickOutSide({ onClickOutSide: () => setIsShowEmoji(false), ref: emojiRef })
    const handleShowPermissionView = (id: number) => () => {
        setPopupPermission(false)
        for (const element of permissionViews) {
            if (element.id === id) {
                setShowPermissionView(omit(element, ['id']))
            }
        }
    }

    const onSubmit = (handleSubmit(async () => {
        try {
            console.log(textPost)
        } catch (error: unknown) {
            console.log(error)
        }
    }))

    const handleFileMedia = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const arrayFile = Array.from(e.target.files);
            setFiles(arrayFile.map(file => URL.createObjectURL(file)))
        }
    }
    const handleCloseGif = () => {
        setGif('')
    }

    const handleShowEmojiPicker = (emojiData: EmojiClickData) => {
        setTextPost(prev => (prev + emojiData.emoji))
    }
    const handleTextareaChange = (e: any) => {
        setCountCharPost(e.target.value.length)
        setTextPost(e.target.value)
        e.target.style.height = `${e.target.scrollHeight}px`
    }

    return (
        <form className="w-[611px] min-h-[155px] mt-[70px]" onSubmit={onSubmit}>
            <ShowGIF ref={gifRef} limit={50} setGif={setGif} />
            <div className="w-full min-h-[100px] flex border-b-[1px] border-solid border-white1 border-r-transparent border-l-transparent border-t-transparent">
                <div className="w-[65px] ml-[10px] mt-[3px]">
                    <img src={Images.bg} className="w-[40px] h-[40px] rounded-[50%] " />
                </div>
                <div className="flex-1 " >
                    <textarea {...register('textPost', {
                        onChange: (e) => handleTextareaChange(e)

                    })} placeholder="What is happening?"
                        className="text-[18px] placeholder-textarea !text-black whitespace-pre-wrap focus:border-none outline-none break-words resize-none  pt-[5px] pl-[10px] bg-transparent font-fontFamily  w-full l-[5px] !focus:border-none !border-none overflow-hidden"
                        value={textPost}

                    />
                    <div className={cn('pr-[10px] ', {
                        'mb-[10px] mt-[10px]': files.length > 0
                    })}>
                        {
                            files !== null && files.length > 0 && ConvertSizeImagesPost({ arrayImage: files, setFiles })
                        }
                        {
                            Boolean(gif) && <div className='w-full relative'>
                                <img src={gif} alt='gif' className='w-full object-cover rounded-lg h-[200px]' />
                                <div className="absolute top-[10px] right-[10px] w-[30px] h-[30px] rounded-[50%] bg-[rgb(45,21,38)] cursor-pointer text-white flex items-center justify-center" onClick={handleCloseGif}><Icons.IoMdClose /></div>
                            </div>
                        }
                    </div>
                    <Popover>
                        <PopoverTrigger asChild className="">
                            <div className=" inline-block  px-[10px]  cursor-pointer items-center  text-green2 hover:bg-[#bbe3ed] rounded-[50px]" onClick={() => setPopupPermission(!showPopupPermission)}>
                                <div className='flex items-center'>
                                    {showPermissionView.icon}
                                    <p className="ml-[5px] text-[14px] font-fontFamily font-[700] text-green2 ">{showPermissionView.title}</p>
                                </div>
                            </div>
                        </PopoverTrigger>
                        {
                            <PopoverContent className=" flex items-center justify-center bg-white !px-0" style={{ boxShadow: "0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)" }}>
                                <div>
                                    <div className="mb-[20px] mt-[10px] px-[10px]">
                                        <h3 className="text-[17px] mb-[10px] font-fontFamily">Who can reply?</h3>
                                        <p className="text-[14px] font-fontFamily">Choose who can reply to this post. Anyone mentioned can always reply</p>
                                    </div>
                                    <div className="w-full">
                                        {
                                            permissionViews.map((item) => {
                                                return <div key={item.id} className="w-full flex items-center  py-[8px] px-[10px] cursor-pointer hover:bg-white1" onClick={handleShowPermissionView(item.id)}>
                                                    <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                                        {item.icon}
                                                    </div>
                                                    <h3 className="text-[17px] font-fontFamily ">{item.title}</h3>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </PopoverContent>
                        }
                    </Popover>
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
                        {isShowEmoji && <div className='w-full absolute top-[44px] right-[50px] z-[9]' ref={emojiRef}><EmojiPicker onEmojiClick={handleShowEmojiPicker} autoFocusSearch /></div>}
                    </div>
                    <div className='flex items-center'>
                        {
                            countCharPost > 0 && <div className='w-[30px] h-[30px] relative mr-[20px]'>

                                <div className='absolute top-0 left-0 right-0 bottom-0 border-[red] border-solid border-[2px] rounded-[50%]'></div>
                            </div>
                        }
                        <Button className="!text-[15px] 
                    !font-[700] text-white font-fontFamily mr-[15px] bg-green2  px-[15px] cursor-pointer !rounded-[50px] flex items-center justify-center">Post</Button>
                    </div>
                </div>
            </div>

        </form>
    )
}
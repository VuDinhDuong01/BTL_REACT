import { type ChangeEvent, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'

import { Icons } from "../../helps/icons"
import { Button } from "../ui/button"
import { Images } from "../../assets/images"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popver"
import { ShowGIF, handleShowPopup } from '../show-gif';
import { cn } from '../../helps/cn';
import { DivideImageSize } from '../../helps/divide-size-image';

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
    const [files, setFiles] = useState<File[] | null>(null)

    const handleIcon = (title: string) => () => {
        switch (title) {
            case 'Media':
                mediaRef.current && mediaRef.current.click()
                break;
            case 'Emoji':
                setIsShowEmoji(!isShowEmoji)
                break;
            case 'Location':
                break;
            case 'Gif':
                gifRef.current && gifRef.current.handleShowPopup()
                break;
            default:
                break;
        }
    }

    const handleShowPermissionView = (id: number) => () => {
        setPopupPermission(false)
        for (const element of permissionViews) {
            if (element.id === id) {
                setShowPermissionView(omit(element, ['id']))
            }
        }
    }

    const onSubmit = (handleSubmit(data => {
        console.log(data)
    }))

    const handleFileMedia = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const arrayFile = Array.from(e.target.files);
            setFiles(arrayFile)
        }
    }

    return (
        <div className="w-[611px] min-h-[155px]">
            <ShowGIF ref={gifRef} limit={50} />
            <div className="w-full min-h-[100px] flex border-b-[1px] border-solid border-white1 4 border-r-transparent border-l-transparent border-t-transparent">
                <div className="w-[65px] ml-[10px] mt-[3px]">
                    <img src={Images.bg} className="w-[40px] h-[40px] rounded-[50%] " />
                </div>
                <form className="flex-1 " onSubmit={onSubmit}>
                    <textarea {...register('textPost', {
                        onChange: (e) => {
                            setCountCharPost(e.target.value.length)
                        }
                    })} placeholder="What is happening?" className="text-[15px] !text-black pt-[5px] pl-[10px]  bg-transparent font-fontFamily  w-full l-[5px] !focus:border-none border-none " />
                    <div className='pr-[10px] mb-[10px]'>
                        {
                            files !== null && files.length > 0 && DivideImageSize(files.map(file => URL.createObjectURL(file)),'post')
                        }
                    </div>
                    <Popover>
                        <PopoverTrigger asChild className="">
                            <div className=" inline-block  px-[10px] py-[4px] cursor-pointer items-center  text-green2 hover:bg-[#bbe3ed] rounded-[50px]" onClick={() => setPopupPermission(!showPopupPermission)}>
                                <div className='flex items-center'>
                                    {showPermissionView.icon}
                                    <p className="ml-[5px] text-[14px] font-fontFamily font-[700] text-green2 ">{showPermissionView.title}</p>
                                </div>
                            </div>
                        </PopoverTrigger>
                        {
                            showPopupPermission && <PopoverContent className=" flex items-center justify-center bg-white !px-0" style={{ boxShadow: "0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)" }}>
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
                </form>
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

                                })} onClick={handleIcon(item.title)}>
                                    {item.icons}
                                </div>
                            })
                        }
                        <input type="file" multiple style={{ display: 'none ' }} ref={mediaRef} onChange={handleFileMedia} />
                        {isShowEmoji && <div className='w-full absolute top-[44px] right-[50px]'><EmojiPicker onEmojiClick={() => { }} autoFocusSearch /></div>}
                    </div>
                    <div className='flex items-center'>
                        {
                            countCharPost > 0 && <div className='w-[30px] h-[30px] relative mr-[20px]'>
                                <div className='w-full h-full rounded-[50%] border-solid border-[2px] border-white1'></div>
                                <div className='absolute top-0 left-0 right-0 bottom-0 border-[red] border-solid border-[2px] rounded-[50%]'></div>
                            </div>
                        }

                        <Button className="!text-[15px] 
                    !font-[700] text-white font-fontFamily mr-[15px] bg-green2  px-[15px] cursor-pointer !rounded-[50px] flex items-center justify-center">Post</Button>

                    </div>
                </div>
            </div>

        </div>
    )
}
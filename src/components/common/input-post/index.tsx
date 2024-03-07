/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef } from "react"
import { FaCamera } from "react-icons/fa6";
import { MdGifBox } from "react-icons/md";
import { FaRegSmileBeam } from "react-icons/fa";
import { EmojiClickData } from "emoji-picker-react";
import { IoSend } from "react-icons/io5";
import { t } from "i18next";

import { ShowGIF, handleShowPopup } from "../../show-gif";
import { EmojiPickers, ShowEmoji } from "../emoji-picker";
import { cn } from "../../../helps/cn";
import { Button } from "../../ui/button";
import { Images } from "../../../assets/images";

interface InputPost {
    content: string,
    setContent: Dispatch<SetStateAction<string>>,
    file: File, avatar_user: string,
    setFile: Dispatch<SetStateAction<string | File>>,
    handleCreateComment: () => Promise<void>
    className?: string

}


interface ListIcon {
    icon: JSX.Element,
    id: number
}
const listIcon = [
    {
        icon: <FaCamera size={20} />,
        id: 1,
    }, {
        icon: <MdGifBox size={20} />,
        id: 2
    }, {
        icon: <FaRegSmileBeam size={20} />,
        id: 3
    }
]

export const InputPost = ({ content, setContent, file, setFile, avatar_user, handleCreateComment, className }: InputPost) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const emojiRef = useRef<ShowEmoji>(null)
    const refGif = useRef<handleShowPopup>(null)

    const handleIcon = (Item: ListIcon) => {
        switch (Item.id) {
            case 1:
                inputRef.current && inputRef.current.click()
                break;
            case 2:
                refGif.current && refGif?.current.handleShowPopup()
                break;
            case 3:
                emojiRef.current && emojiRef.current?.toggleShowEmoji()
                break;
            default:
                break;
        }
    }
    const handleShowEmojiPicker = (emojiData: EmojiClickData) => {

        setContent(prev => (prev + emojiData.emoji))
    }
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    useEffect(() => {
        if (textAreaRef.current) {
            (textAreaRef?.current as any).style.height = "auto";
            (textAreaRef.current as any).style.height = (textAreaRef.current as any).scrollHeight + "px";
        }
    }, [content])
    // className='p-[5px] text-[17px] font-fontFamily  w-full active:outline-none focus:outline-none rounded-lg border-none overflow-hidden resize-none bg-[#F0F2F5]'
    return <div className=' min-h-[100px] flex'>
        <img src={Boolean(avatar_user) ? avatar_user : Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
        <div className='flex-1 relative'>
            <textarea className={className} placeholder={t('home.comment')} value={content} onChange={handleChange} rows={5} ref={textAreaRef}></textarea>
            <ShowGIF ref={refGif} limit={50} setGif={setFile} />
            <EmojiPickers handleShowEmojiPicker={handleShowEmojiPicker} ref={emojiRef} className=' absolute  top-[-460px] right-[50px] z-[9]' />
            <div className="w-full flex items-center absolute bottom-[5px] left-[10px]">
                {
                    listIcon.map((Item) => {
                        return <div key={Item.id} className={cn("text-black mx-[3px] cursor-pointer", {
                            'text-[#C9CCD1] !cursor-not-allowed pointer-events-none': file && Item.id === 1,
                            'text-[#C9CCD1] !cursor-not-allowed pointer-events-none ': file && Item.id === 2
                        })} onClick={() => handleIcon(Item)}>{
                                Item.icon
                            }</div>
                    })
                }
                <input type="file" style={{ display: 'none' }} ref={inputRef} onChange={handleFile} />
            </div>
            <div className="absolute bottom-[5px] right-0">
                <Button disabled={
                    !Boolean(content)} className={cn("w-[]    border-none outline-none ", {
                        '!text-[#3C87DA] cursor-pointer': Boolean(content),
                        'text-[#686a6f] !cursor-not-allowed': !Boolean(content)
                    })} onClick={handleCreateComment}><div><IoSend /></div></Button>
            </div>
        </div>
    </div>



}
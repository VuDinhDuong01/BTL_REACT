/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { FaCamera } from "react-icons/fa6";
import { MdGifBox } from "react-icons/md";
import { FaRegSmileBeam } from "react-icons/fa";
import { ShowGIF, handleShowPopup } from "../../show-gif";
import { EmojiPickers, ShowEmoji } from "../emoji-picker";
import { EmojiClickData } from "emoji-picker-react";
import { cn } from "../../../helps/cn";

interface InputPost {

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


export const InputPost = ({ comment_id, file, setFile }: { comment_id: string, file: string, setFile: Dispatch<SetStateAction<string>> }) => {
    const [comment, setComment] = useState('')
    const contentEditableRef = useRef<any>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    // const [file, setFile] = useState<string>('')
    const emojiRef = useRef<ShowEmoji>(null)

    const refGif = useRef<handleShowPopup>(null)
    const handleTextChange = () => {
        const newText = contentEditableRef?.current?.innerText;
        setComment(newText as string);
    }
    const moveCaretToEnd = () => {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(contentEditableRef.current);
        range.collapse(false);

        selection?.removeAllRanges();
        selection?.addRange(range);
    };
    useEffect(() => {
        moveCaretToEnd();
    }, [comment]);
    const handlePlaceholderClick = () => {
        contentEditableRef?.current?.focus();
    };
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
        console.log(emojiData.emoji)
        setComment(prev => (prev + emojiData.emoji))
    }
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = (e.target.files as FileList)[0].name;
        setFile(file)
    }

    return <div className='w-full relative'>
        <div
            ref={contentEditableRef}
            contentEditable="true"
            onInput={handleTextChange}
            className='border-none outline-none bg-[#F0F2F5] font-fontFamily rounded-lg text-[17px]  text-[#667581] w-full overflow-hidden whitespace-normal h-full'
            style={{
                padding: '5px',
                minHeight: '50px',
                maxWidth: '630px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
            }}
        />
        {!comment && (
            <div
                className=" absolute text-[#667581] top-[5px] left-[7px] font-fontFamily text-[15px]"
                onClick={handlePlaceholderClick}
            >
                Viết bình luận...
            </div>
        )}
        <ShowGIF ref={refGif} limit={50} setGif={setFile} />
        <EmojiPickers handleShowEmojiPicker={handleShowEmojiPicker} ref={emojiRef} className='w-full absolute  top-[-460px] right-[50px] z-[9]' />
        <div className="w-full flex items-center absolute bottom-0 left-[10px]">
            {
                listIcon.map((Item) => {
                    return <div key={Item.id} className={cn("text-black mx-[3px] cursor-pointer", {
                        'text-[#C9CCD1] !cursor-not-allowed': file !== '' && Item.id === 1,
                        'text-[#C9CCD1] !cursor-not-allowed ': file !== '' && Item.id === 2
                    })} onClick={() => handleIcon(Item)}>{
                            Item.icon
                        }</div>
                })
            }
            <input type="file" style={{ display: 'none' }} ref={inputRef} onChange={handleFile} />
        </div>
    </div>


}
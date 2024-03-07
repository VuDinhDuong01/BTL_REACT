import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useClickOutSide } from '../../../hooks/useClickOutSide';


export interface Props {
    handleShowEmojiPicker: (emojiData: EmojiClickData) => void
    className?: string
}

export interface ShowEmoji {
    toggleShowEmoji: () => void
}

export const EmojiPickers = forwardRef<ShowEmoji, Props>(({ handleShowEmojiPicker, className }, ref) => {
    
    const emojiRef = useRef<HTMLDivElement>(null)
    const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false)

    const toggleEmoji = () => {
        setIsShowEmoji(!isShowEmoji)
    }

    useImperativeHandle(ref, () => ({
        toggleShowEmoji: toggleEmoji
    }));

    useClickOutSide({ onClickOutSide: () => setIsShowEmoji(false), ref: emojiRef })

    return isShowEmoji && <div className={className} ref={emojiRef}><EmojiPicker onEmojiClick={handleShowEmojiPicker}  autoFocusSearch  /></div>

});


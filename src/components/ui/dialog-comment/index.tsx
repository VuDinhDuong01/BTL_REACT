/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import { useImperativeHandle, forwardRef, useState, useRef, useEffect } from 'react'

import { useTranslation } from "react-i18next";


import { Dialog, DialogOverlay } from "../dialog";
import { Icons } from '../../../helps/icons';


import { Images } from '../../../assets/images';

export type ShowPopupComment = {
    showPopup: () => void;
};


interface FileImageProps {
    [key: string]: File | null
}

export const PopupComment = forwardRef<ShowPopupComment, any>((props, ref) => {
    const contentEditableRef = useRef<any>(null);
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false)

    const [comment, setComment] = useState('');

    //    const moveCaretToEnd = () => {
    //         const range = document.createRange();
    //         const selection = window.getSelection();

    //         range.selectNodeContents(contentEditableRef.current);
    //         range.collapse(false);

    //         selection?.removeAllRanges();
    //         selection?.addRange(range);
    //     };
    //     useEffect(() => {
    //         moveCaretToEnd();
    //     }, [comment]);

    const showPopup = () => {
        setIsShowPopup(true)
    }

    const hiddenPopup = () => {
        setIsShowPopup(false)
    }
    useImperativeHandle(ref, () => ({
        showPopup: showPopup
    }));

    const handlePlaceholderClick = () => {
        contentEditableRef.current.focus();
    };
    const handleTextChange = () => {
        const newText = contentEditableRef.current.innerText;
        setComment(newText);
    };

    return (<div>
        {
            isShowPopup && <Dialog open={isShowPopup}>
                <DialogOverlay />
                <div className=' w-full cursor-default h-full flex fixed inset-0 items-center justify-center z-[999999]'>
                    <div className='h-[900px] w-[700px] bg-white rounded-[20px] flex flex-col items-center relative' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} >
                        <div className='w-full flex  rounded-t-[20px]  cursor-pointer  !h-[70px] '>
                            <div style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} className='flex items-center   w-full  rounded-t-[20px] '>
                                <div className=' flex items-center  ml-[10px]'><div className='mr-[15px] w-[30px] h-[30px] rounded-[50%] bg-black3 flex items-center justify-center hover:opacity-[80%]' onClick={hiddenPopup}><Icons.IoMdClose size={20} /></div></div>
                                <div className='w-full flex items-center justify-center text-[20px] font-fontFamily'><h2 className='text-[20px]'>Bài viết của Ngọc Dương</h2></div>
                            </div>
                        </div>
                        <div className='w-full flex-1 overflow-y-scroll '>
                            <div className='px-[20px]'>
                                <div className='w-full flex mt-[10px] '>
                                    <img src={Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                    <div>
                                        <div>
                                            <div className='inline-block bg-[#F0F2F5] rounded-xl px-[20px] py-[10px]'>
                                                <h4 className='font-[600] font-fontFamily text-[16px]'>Ngọc Dương</h4>
                                                <p className='text-[14px] font-fontFamily'>dạo này toàn xinh gái hahahahahahahah</p>
                                            </div>
                                            <div className='w-[200px] mt-[5px] flex items-center justify-between'>
                                                <p className='text-[15px] font-fontFamily'>1 giờ</p>
                                                <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline'>Thích</p>
                                                <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline'>Phản hồi</p>
                                            </div>
                                        </div>
                                        <div className=' mt-[10px]'>
                                            <div className='flex mb-[10px]'>
                                                <img src={Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                                <div>
                                                    <div>
                                                        <div className='inline-block bg-[#F0F2F5] rounded-xl px-[20px] py-[10px]'>
                                                            <h4 className='font-[600] font-fontFamily text-[16px]'>Ngọc Dương</h4>
                                                            <p className='text-[14px] font-fontFamily'>dạo này toàn xinh gái hahahahahahahah</p>
                                                        </div>
                                                        <div className='w-[100px] mt-[5px] flex items-center justify-between'>
                                                            <p className='text-[15px] font-fontFamily'>1 giờ</p>
                                                            <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline'>Thích</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='flex mb-[10px]'>
                                                <img src={Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                                <div>
                                                    <div>
                                                        <div className='inline-block bg-[#F0F2F5] rounded-xl px-[20px] py-[10px]'>
                                                            <h4 className='font-[600] font-fontFamily text-[16px]'>Ngọc Dương</h4>
                                                            <p className='text-[14px] font-fontFamily'>dạo này toàn xinh gái hahahahahahahah</p>
                                                        </div>
                                                        <div className='w-[100px] mt-[5px] flex items-center justify-between'>
                                                            <p className='text-[15px] font-fontFamily'>1 giờ</p>
                                                            <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0]'>Thích</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='flex mb-[10px]'>
                                                <img src={Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                                <div>
                                                    <div>
                                                        <div className='inline-block bg-[#F0F2F5] rounded-xl px-[20px] py-[10px]'>
                                                            <h4 className='font-[600] font-fontFamily text-[16px]'>Ngọc Dương</h4>
                                                            <p className='text-[14px] font-fontFamily'>dạo này toàn xinh gái hahahahahahahah</p>
                                                        </div>
                                                        <div className='w-[100px] mt-[5px] flex items-center justify-between'>
                                                            <p className='text-[15px] font-fontFamily'>1 giờ</p>
                                                            <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0]'>Thích</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full min-h-[120px] p-[10px]  ' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}>
                            <div className='w-full h-full  flex '>
                                <img src={Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                <div className='w-full relative'>
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
                                            className="w-full absolute text-[#667581] top-[5px] left-[7px] font-fontFamily text-[15px]"
                                            onClick={handlePlaceholderClick}
                                        >
                                            Viết bình luận...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        }
    </div>
    )
});





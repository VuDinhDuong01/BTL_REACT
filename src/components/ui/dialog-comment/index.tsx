/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import { useImperativeHandle, forwardRef, useState, useRef, useContext, Dispatch, SetStateAction } from 'react'

import { Dialog, DialogOverlay } from "../dialog";
import { Icons } from '../../../helps/icons';
import { Images } from '../../../assets/images';
import { ContextProvider } from '../../post';
import { convertDateToHours } from '../../../helps/convert-date-to-hour';
import { InputPost } from '../../common/input-post';
import { useClickOutSide } from '../../../hooks/useClickOutSide';
import { useCreateCommentMutation, useCreateRepliesCommentMutation } from '../../../apis/comment';
import { useUploadImageMutation } from '../../../apis';
import { getProfileToLS } from '../../../helps';

export type ShowPopupComment = {
    showPopup: () => void;
};
interface PropsDialogComment {
    handleLike: (_id_comment: string) => Promise<void>
    handleShowListIcon: (_id_comment?: string) => void
    isHovered: string
    handleHiddenListIcon: () => void
    setIcon: Dispatch<SetStateAction<string>>
    tweet_id: string
    users: { username: string, avatar: string, bio: string }
    isShowInputRepliesComment: string
    setIsShowInputRepliesComment: Dispatch<SetStateAction<string>>
}

export const PopupComment = forwardRef<ShowPopupComment, PropsDialogComment>(({ users, setIsShowInputRepliesComment, isShowInputRepliesComment, handleLike, tweet_id, handleShowListIcon, isHovered, handleHiddenListIcon, setIcon }, ref) => {
    const { data } = useContext(ContextProvider)
    const refPopComment = useRef<HTMLDivElement>(null)
    const [createComment] = useCreateCommentMutation()
    const [createRepliesComment] = useCreateRepliesCommentMutation()
    const [content, setContent] = useState<string>('')
    const [uploadImages] = useUploadImageMutation()
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false)
    const profile = getProfileToLS() as { user_id: string, username: string }
    const showPopup = () => {
        setIsShowPopup(true)
    }
  
    const hiddenPopup = () => {
        setIsShowPopup(false)
        SetFile('')
        setIsShowInputRepliesComment('')
    }
    useImperativeHandle(ref, () => ({
        showPopup: showPopup
    }));

    const [file, SetFile] = useState<File | string>('')
    useClickOutSide({
        onClickOutSide: () => {
            setIsShowPopup(false)
            SetFile('')
            setIsShowInputRepliesComment('')
        }, ref: refPopComment
    })

    const handleRepliesComment = (comment_id: string) => {
        setIsShowInputRepliesComment(comment_id)
    }
    const handleCreateComment = async () => {
        try {
            const formData = new FormData()
            if (typeof file === 'string') {
                formData.append("video", file)
            } else {
                formData.append("image", file)
            }
            const uploadImage = await uploadImages(formData).unwrap()
    
            await createComment({
                tweet_id: tweet_id,
                user_id: profile.user_id,
                content_comment: content,
                image_comment: uploadImage[0].image
            }).unwrap()
            SetFile('')
            setContent('')
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const  handleCreateRepliesComment=async()=>{
        
        try {
            const formData = new FormData()
            if (typeof file === 'string') {
                formData.append("video", file)
            } else {
                formData.append("image", file)
            }
            const uploadImage = await uploadImages(formData).unwrap()
            await createRepliesComment({
                user_id: profile.user_id,
                replies_comment_id: isShowInputRepliesComment,
                replies_content_comment: content,
                replies_image_comment: uploadImage[0].image
            }).unwrap()
            
            SetFile('')
            setContent('')
        } catch (error: unknown) {
            console.log(error)
        }
    }

    return (<div>
        {
            isShowPopup && <Dialog open={isShowPopup}>
                <DialogOverlay />
                <div className=' w-full cursor-default h-full flex fixed inset-0 items-center justify-center z-[999999]' >
                    <div className='h-[900px] w-[700px] bg-white rounded-[20px] flex flex-col items-center relative' ref={refPopComment} style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} >
                        <div className='w-full flex  rounded-t-[20px]  cursor-pointer  !h-[70px] '>
                            <div style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} className='flex items-center   w-full  rounded-t-[20px] '>
                                <div className=' flex items-center  ml-[10px]'><div className='mr-[15px] w-[30px] h-[30px] rounded-[50%] bg-black3 flex items-center justify-center hover:opacity-[80%]' onClick={hiddenPopup}><Icons.IoMdClose size={20} /></div></div>
                                <div className='w-full flex items-center justify-center text-[20px] font-fontFamily'><h2 className='text-[20px]'>{`Bài viết của ${users?.username}`}</h2></div>
                            </div>
                        </div>
                        <div className='w-full flex-1 overflow-auto pb-[20px] '>
                            <div className='px-[20px]  cursor-pointer  w-full'>
                                {
                                    data.data.length > 0 && data.data.map(comment => {
                                        return <div className='w-full flex mt-[15px]' key={comment._id}>
                                            <img src={comment.info_user?.avatar ? comment.info_user?.avatar : Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                            <div className='w-full'>
                                                <div className='w-full'>
                                                    <div className='inline-block bg-[#F0F2F5] rounded-xl px-[20px] py-[10px]'>
                                                        <h4 className='font-[600] font-fontFamily text-[16px]'>{comment?.info_user?.username}</h4>
                                                        <p className='text-[14px] font-fontFamily'>{comment?.content_comment}</p>
                                                    </div>
                                                    {
                                                        comment.image_comment !== '' && <div className='mt-[20px]'>
                                                            <img src={comment.image_comment} alt="image-comment" className='w-[200px] h-[100px] object-cover rounded-lg' />
                                                        </div>
                                                    }
                                                    <div className='w-[200px] mt-[5px] flex items-center justify-between'>
                                                        <p className='text-[15px] font-fontFamily'>{`${convertDateToHours(comment.created_at)} giờ`}</p>
                                                        <div className='relative'>
                                                            <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline' onClick={() => handleLike(comment._id)} onMouseEnter={() => handleShowListIcon(comment._id)} onMouseLeave={handleHiddenListIcon}>Thích</p>
                                                            {/* {
                                                                isHovered === comment._id && <div className='absolute top-[-50px]' onMouseEnter={() => handleLike(comment._id)}><ListIcons setIcon={setIcon} /></div>
                                                            } */}

                                                        </div>
                                                        <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline' onClick={() => handleRepliesComment(comment._id)}>Phản hồi</p>
                                                    </div>
                                                    <div className='w-full mt-[20px]'>
                                                        {
                                                            isShowInputRepliesComment === comment._id &&
                                                            <InputPost
                                                                file={file as File}
                                                                setFile={SetFile}
                                                                avatar_user={users.avatar}
                                                                content={content}
                                                                setContent={setContent}
                                                                handleCreateComment={handleCreateRepliesComment}
                                                            />
                                                        }
                                                    </div>

                                                </div>
                                                {
                                                    comment?.replies_comments.length > 0 && Object.keys(comment.replies_comments[0]).length > 0 && comment?.replies_comments.map(replies_comment => {
                                                        return <div className=' mt-[10px]' key={replies_comment._id}>
                                                            <div className='flex mb-[10px]'>
                                                                <img src={replies_comment?.avatar ? replies_comment?.avatar : Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                                                <div>
                                                                    <div>
                                                                        <div className='inline-block bg-[#F0F2F5] rounded-xl px-[20px] py-[10px]'>
                                                                            <h4 className='font-[600] font-fontFamily text-[16px]'>{replies_comment?.username}</h4>
                                                                            <p className='text-[14px] font-fontFamily'>{replies_comment?.replies_content_comment}</p>
                                                                        </div>
                                                                        <div className='w-[100px] mt-[5px] flex items-center justify-between'>
                                                                            <p className='text-[15px] font-fontFamily'>1 giờ</p>
                                                                            <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline'>Thích</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className='w-full min-h-[120px] p-[10px] ' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}>
                            <InputPost
                                file={file as File}
                                setFile={SetFile}
                                avatar_user={users.avatar}
                                handleCreateComment={handleCreateComment}
                                content={content}
                                setContent={setContent}
                            />

                            <div className='relative'>
                                {
                                    file && <img src={typeof file === 'string' ? file : URL.createObjectURL(file as File)} alt='flag-image' className='w-[100px] h-[50px] object-cover  rounded-[10px] ml-[50px] my-[5px]' />
                                }
                                <div className=' absolute right-[0px] top-[10px] cursor-pointer' onClick={() => SetFile('')}>
                                    {
                                        file && <Icons.IoMdClose size={25} />
                                    }
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



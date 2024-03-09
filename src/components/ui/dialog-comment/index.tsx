
import { useImperativeHandle, forwardRef, useState, useRef, useContext } from 'react'
import { t } from "i18next";

import { Dialog, DialogContent, DialogOverlay } from "../dialog";
import { Icons } from '../../../helps/icons';
import { Images } from '../../../assets/images';

import { convertDateToHours } from '../../../helps/convert-date-to-hour';
import { InputPost } from '../../common/input-post';
import { useClickOutSide } from '../../../hooks/useClickOutSide';
import { useCreateCommentMutation, useCreateRepliesCommentMutation, useGetCommentMutation } from '../../../apis/comment';
import { UploadImageResponse, useUploadImageMutation } from '../../../apis';
import { getProfileToLS } from '../../../helps';
import { ListIcons } from '../../list-icons';
import { LikeComment } from '../../../types/comment';
import { cn } from '../../../helps/cn';
import { GetCommentResponse } from '../../post';
import { Skeleton } from '../skeleton';
import { ContextAPI } from '../../../hooks';

export type ShowPopupComment = {
    showPopup: () => void;
};
interface PropsDialogComment {
    loading: boolean
    tweet_id: string
    users: { username: string, avatar: string, bio: string }
}

export const PopupComment = forwardRef<ShowPopupComment, PropsDialogComment>(({ users, tweet_id, loading }, ref) => {
    const [getComment] = useGetCommentMutation()
    const refPopComment = useRef<HTMLDivElement>(null)
    const [createComment] = useCreateCommentMutation()
    const [createRepliesComment] = useCreateRepliesCommentMutation()
    const [content, setContent] = useState<string>('')
    const [RepliesContent, setRepliesContent] = useState<string>('')
    const [file, SetFile] = useState<File | string>('')
    const [fileRepliesComment, setFileRepliesComment] = useState<File | string>('')
    const [openReplyComment, setOpenReplyComment] = useState<boolean>(false)
    const [uploadImages] = useUploadImageMutation()
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false)
    const { user_id } = getProfileToLS() as { user_id: string, username: string }

    const { handleLike, isHovered, isShowInputRepliesComment, handleSelectIcon, setIsShowInputRepliesComment, setListComment, listComment, handleSelectIconRepliesComment } = useContext(ContextAPI)

    const showPopup = () => {
        setIsShowPopup(true)
    }

    const hiddenPopup = () => {
        setIsShowPopup(false)
        SetFile('')
        setRepliesContent('')
        setContent('')
        setFileRepliesComment('')
        setIsShowInputRepliesComment('')
    }
    useImperativeHandle(ref, () => ({
        showPopup: showPopup
    }));


    useClickOutSide({
        onClickOutSide: () => {
            setIsShowPopup(false)
            SetFile('')
            setRepliesContent('')
            setContent('')
            setIsShowInputRepliesComment('')
            setFileRepliesComment('')
        }, ref: refPopComment
    })

    const handleRepliesComment = (comment_id: string) => {
        setIsShowInputRepliesComment(comment_id)
    }
    const handleCreateComment = async () => {
        try {
            let uploadImage: UploadImageResponse[] = [];
            if (file !== '') {
                const formData = new FormData()
                if (typeof file === 'string') {
                    formData.append("video", file)
                } else {
                    formData.append("image", file)
                }
                uploadImage = await uploadImages(formData).unwrap()
            }

            await createComment({
                tweet_id: tweet_id,
                user_id: user_id,
                content_comment: content,
                image_comment: file !== '' ? uploadImage[0].image : ''
            }).unwrap()
            const res = await getComment({
                tweet_id: tweet_id,
                limit: 50,
                page: 1
            }).unwrap()
            setListComment(res)
            SetFile('')
            setContent('')
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const handleCreateRepliesComment = async () => {
        try {
            let uploadImage: UploadImageResponse[] = [];
            if (fileRepliesComment !== '') {
                const formData = new FormData()
                if (typeof fileRepliesComment === 'string') {
                    formData.append("video", fileRepliesComment)
                } else {
                    formData.append("image", fileRepliesComment)
                }
                uploadImage = await uploadImages(formData).unwrap()
            }
            await createRepliesComment({
                user_id: user_id,
                replies_comment_id: isShowInputRepliesComment,
                replies_content_comment: RepliesContent,
                replies_image_comment: fileRepliesComment !== '' ? uploadImage[0].image : ''
            }).unwrap()
            setRepliesContent('')
            setFileRepliesComment('')
        } catch (error: unknown) {
            console.log(error)
        }
    }

    const handleFilerIcon = (listIcon: LikeComment[]) => {
        const icons = listIcon.map(icon => icon.icon)
        return Array.from(new Set(icons))

    }

    const renderColorLike = (icon: string, like_comment: LikeComment[]) => {
        return like_comment?.some(item => item.user_id === user_id && item.icon === icon)
    }

    const renderTextLike = (like_comment: LikeComment[]) => {
        const findUerLike = like_comment?.filter(item => item.user_id === user_id)
        if (findUerLike?.length === 0) {
            return 'Thích'
        }
        else {
            if (findUerLike?.length > 0) {
                if (findUerLike[0]?.icon === '👍') {
                    return 'Thích';
                } else if (findUerLike[0]?.icon === '❤️') {
                    return 'Yêu thích';
                } else if (findUerLike[0]?.icon === '😂') {
                    return 'Haha';
                } else if (findUerLike[0]?.icon === '😢') {
                    return 'Buồn';
                } else {
                    return 'Thất vọng';
                }
            }
        }
    }

    return (<div>
        {
            isShowPopup && <Dialog open={isShowPopup}>
                <DialogOverlay className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto py-16 grid place-items-center' />
                <DialogContent className=' w-full cursor-default h-full flex fixed inset-0 items-center justify-center z-[99]' >
                    <div className='h-[900px] w-[700px] bg-white rounded-[20px] flex flex-col items-center relative' ref={refPopComment} style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} >
                        <div className='w-full flex  rounded-t-[20px]  cursor-pointer  !h-[70px] '>
                            <div style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }} className='flex items-center   w-full  rounded-t-[20px] '>
                                <div className=' flex items-center  ml-[10px]'><div className='mr-[15px] w-[30px] h-[30px] rounded-[50%] bg-black3 flex items-center justify-center hover:opacity-[80%]' onClick={hiddenPopup}><Icons.IoMdClose size={20} /></div></div>
                                <div className='w-full flex items-center justify-center text-[20px] font-fontFamily'><h2 className='text-[20px] text-black'>{`Bài viết của ${users?.username}`}</h2></div>
                            </div>
                        </div>

                        <div className='w-full flex-1 overflow-auto py-[20px] '>
                            <div className='px-[20px] cursor-pointer  w-full h-full'>
                                {
                                    loading ? <Skeleton /> : <>
                                        {
                                            listComment.data?.length > 0 ? (listComment as GetCommentResponse).data?.map(comment => {
                                                return <div className='w-full flex' key={comment._id}>
                                                    <img src={comment.info_user?.avatar ? comment.info_user?.avatar : Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                                    <div className='w-full'>
                                                        <div className='w-full'>
                                                            <div className='inline-block bg-[#F0F2F5] rounded-xl px-[15px] py-[8px] text-black'>
                                                                <h4 className='font-[600] font-fontFamily text-[16px]'>{comment?.info_user?.username}</h4>
                                                                <p className='text-[14px] font-fontFamily mt-[4px]'>{comment?.content_comment}</p>
                                                            </div>
                                                            {
                                                                comment.image_comment !== '' && <div className='mt-[20px]'>
                                                                    <img src={comment.image_comment} alt="image-comment" className='w-[200px] h-[100px] object-cover rounded-lg' />
                                                                </div>
                                                            }
                                                            <div className='w-full items-center justify-between flex'>
                                                                <div className='w-[200px] mt-[5px] flex items-center justify-between'>
                                                                    <p className='text-[15px] font-fontFamily text-black'>{convertDateToHours(comment.created_at)}</p>
                                                                    <div className='relative'>
                                                                        <p className={cn('text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline', {
                                                                            'text-[#1B90DF] font-[600]': renderColorLike('👍', comment.like_comments),
                                                                            'text-[#FD6068] font-[600]': renderColorLike('❤️', comment.like_comments),
                                                                            'text-[#FFE15B] font-[600]': renderColorLike('😂', comment.like_comments),
                                                                            'text-[#FFE15B]  font-[600]': renderColorLike('😌', comment.like_comments),
                                                                            'text-[#FFE15B]   font-[600]': renderColorLike('😢', comment.like_comments)
                                                                        })} onClick={() => {
                                                                            handleLike(comment._id)
                                                                        }}
                                                                        >{
                                                                                renderTextLike(comment.like_comments)
                                                                            }</p>
                                                                        {isHovered === comment._id && <div className='absolute top-[-50px]'><ListIcons handleSelectIcon={handleSelectIcon} /></div>}
                                                                    </div>
                                                                    <p className='text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline' onClick={() => handleRepliesComment(comment._id)}>{t('home.reply')}</p>
                                                                </div>
                                                                {comment.like_comments.length > 0 &&
                                                                    <div className=' bg-white flex items-center px-[8px] py-[3px] rounded-2xl' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}>
                                                                        {
                                                                            handleFilerIcon(comment.like_comments).map((Icon, index) => {
                                                                                return <div key={index} className='text-[13px]'>
                                                                                    {Icon}
                                                                                </div>
                                                                            })
                                                                        }
                                                                        <div className='font-[550] font-fontFamily ml-[5px] text-black'>{comment.like_comments.length}</div>
                                                                    </div>
                                                                }
                                                            </div>

                                                            <div className='w-full mt-[20px]'>
                                                                {
                                                                    isShowInputRepliesComment === comment._id && (<>
                                                                        <InputPost
                                                                            className='p-[5px]  text-[17px] font-fontFamily  w-full active:outline-none focus:outline-none rounded-lg border-none overflow-hidden resize-none bg-[#F0F2F5] !h-[100px]'
                                                                            file={fileRepliesComment as File}
                                                                            setFile={setFileRepliesComment}
                                                                            avatar_user={users.avatar}
                                                                            content={RepliesContent}
                                                                            setContent={setRepliesContent}
                                                                            handleCreateComment={handleCreateRepliesComment}
                                                                        />
                                                                        <div className='relative '>
                                                                            {
                                                                                fileRepliesComment && <img src={typeof fileRepliesComment === 'string' ? fileRepliesComment : URL.createObjectURL(fileRepliesComment as File)} alt='flag-image' className='w-[100px] h-[50px] object-cover  rounded-[10px] ml-[50px] my-[5px]' />
                                                                            }
                                                                            <div className=' absolute right-[0px] top-0  cursor-pointer text-black ' onClick={() => setFileRepliesComment('')}>
                                                                                {
                                                                                    fileRepliesComment && <Icons.IoMdClose size={25} />
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        {
                                                            (Object.keys(comment.replies_comments[0])?.length > 0 && openReplyComment)
                                                            && <>
                                                                {
                                                                    comment?.replies_comments?.map(replies_comment => {
                                                                        return <div className=' mt-[10px]' key={replies_comment._id}>
                                                                            <div className='flex mb-[10px]'>
                                                                                <img src={replies_comment?.avatar ? replies_comment?.avatar : Images.background} alt='avatar' className='w-[40px] h-[40px] object-cover rounded-[50%] mr-[10px]' />
                                                                                <div>
                                                                                    <div>
                                                                                        <div className='flex items-center relative '>
                                                                                            <div className='inline-block bg-[#F0F2F5]  text-black rounded-xl px-[20px] py-[10px] '>
                                                                                                <h4 className='font-[600] font-fontFamily text-[16px]'>{replies_comment?.username}</h4>
                                                                                                <p className='text-[14px] font-fontFamily'>{replies_comment?.replies_content_comment}</p>
                                                                                            </div>
                                                                                            <div className=' absolute right-[0]'>
                                                                                                {replies_comment.replies_like_comments?.length > 0 &&
                                                                                                    <div className=' bg-white flex items-center    px-[5px] py-[3px] rounded-2xl' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}>
                                                                                                        {
                                                                                                            handleFilerIcon(replies_comment.replies_like_comments).map((Icon, index) => {
                                                                                                                return <div key={index} className='text-[13px]'>
                                                                                                                    {Icon}
                                                                                                                </div>
                                                                                                            })
                                                                                                        }
                                                                                                        <div className='font-[550] font-fontFamily ml-[5px]'>{replies_comment.replies_like_comments.length}</div>
                                                                                                    </div>
                                                                                                }
                                                                                            </div>

                                                                                        </div>

                                                                                        {
                                                                                            replies_comment.replies_image_comment !== '' && <div className='mt-[20px]'>
                                                                                                <img src={replies_comment.replies_image_comment} alt="image-comment" className='w-[200px] h-[100px] object-cover rounded-lg' />
                                                                                            </div>
                                                                                        }
                                                                                        <div className='w-[200px] mt-[5px] flex items-center'>
                                                                                            <p className='text-[15px] font-fontFamily w-[150px]  pr-[10px] text-black'>{convertDateToHours(replies_comment.created_at)}</p>
                                                                                            <div className='w-full relative'>
                                                                                                <p className={cn('text-[15px] font-fontFamily font-[540] text-[#a6aab0] cursor-pointer hover:underline',
                                                                                                    {
                                                                                                        'text-[#1B90DF] font-[600]': renderColorLike('👍', replies_comment?.replies_like_comments),
                                                                                                        'text-[#FD6068] font-[600]': renderColorLike('❤️', replies_comment?.replies_like_comments),
                                                                                                        '!text-[#FFE15B] font-[600]': renderColorLike('😂', replies_comment?.replies_like_comments),
                                                                                                        '!text-[#FFE15B]  font-[600]': renderColorLike('😌', replies_comment?.replies_like_comments),
                                                                                                        '!text-[#FFE15B]   font-[600]': renderColorLike('😢', replies_comment?.replies_like_comments)
                                                                                                    }
                                                                                                )} onClick={() => {
                                                                                                    handleLike(replies_comment._id)
                                                                                                }}>{renderTextLike(replies_comment?.replies_like_comments)}</p>
                                                                                                {
                                                                                                    isHovered === replies_comment._id && <div className=''><ListIcons handleSelectIcon={handleSelectIconRepliesComment} /></div>
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    })
                                                                }
                                                            </>

                                                        }
                                                        {
                                                            Object.keys(comment.replies_comments[0])?.length > 0 && openReplyComment === false && <div className='flex items-center text-[15px] font-fontFamily mt-[-10px] font-[600] text-[#828484] mb-[10px]' onClick={() => setOpenReplyComment(true)}>
                                                                <Icons.PiArrowBendUpRightThin size={25} />
                                                                <p className='text-[16px] ml-[10px]'>{`Xem ${comment.replies_comments.length === 1 ? '' : 'tất cả'} ${comment?.replies_comments?.length} phản hồi`}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            }) : <div className='w-full h-full flex text-[20px] items-center justify-center font-fontFamily font-[600] cursor-default text-black'>Chưa có bình luận nào cho bài Post</div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        <div className='w-full min-h-[120px] p-[10px] ' style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}>
                            <InputPost
                                className='p-[5px] text-[17px] font-fontFamily  w-full active:outline-none focus:outline-none rounded-lg border-none overflow-hidden resize-none bg-[#F0F2F5]'

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
                                <div className=' absolute right-[0px] top-[10px] cursor-pointer text-black' onClick={() => SetFile('')}>
                                    {
                                        file && <Icons.IoMdClose size={25} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        }
    </div>
    )
});



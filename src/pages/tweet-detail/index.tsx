import { useParams, useNavigate, useLocation } from "react-router-dom"
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { skipToken } from "@reduxjs/toolkit/query";
import { useContext, useMemo, useState } from "react";
import { t } from 'i18next'

import { Icons } from "../../helps/icons"
import { Images } from "../../assets/images"
import { PAGE } from "../../contants"
import { useGetTweetDetailQuery } from "../../apis/tweet";
import { Skeleton, Skeleton2 } from "../../components/ui/skeleton";
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default";
import { Like } from "../../types/tweet";
import { cn } from "../../helps/cn";
import { getProfileToLS } from "../../helps";
import { TotalNumber } from "../../helps/sum-total-number";
import { useLikeMutation, useUnLikeMutation } from "../../apis/like";
import { useBookmarkMutation, useUnBookmarkMutation } from "../../apis/bookmark";
import { InputPost } from "../../components/common/input-post";
import { ContextAPI } from "../../hooks";
import { convertDateToHours } from "../../helps/convert-date-to-hour";
import { Comment, LikeComment } from "../../types/comment";
import { ListIcons } from "../../components/list-icons";
import { UploadImageResponse, useUploadImageMutation } from "../../apis";
import { useCreateCommentMutation, useCreateRepliesCommentMutation } from "../../apis/comment";
import { GetCommentResponse } from "../../components/post";



export const TweetDetail = () => {
  const [likeTweet] = useLikeMutation()
  const [unLikeTweet] = useUnLikeMutation()
  const [bookmarkTweet] = useBookmarkMutation()
  const [unBookmarkTweet] = useUnBookmarkMutation()
  const [content, setContent] = useState<string>('')
  const [createComment] = useCreateCommentMutation()
  const [createRepliesComment] = useCreateRepliesCommentMutation()
  const [uploadImages] = useUploadImageMutation()
  const [openReplyComment, setOpenReplyComment] = useState<boolean>(false)
  const { data, loading } = useLocation().state
  const { data: getComment } = data as GetCommentResponse

  const [RepliesContent, setRepliesContent] = useState<string>('')
  const [file, SetFile] = useState<File | string>('')
  const [fileRepliesComment, setFileRepliesComment] = useState<File | string>('')
  const { tweet_id } = useParams()
  const { user_id } = getProfileToLS() as { user_id: string }
  const navigate = useNavigate()

  const { data: tweetDetail, isLoading } = useGetTweetDetailQuery(tweet_id ? {
    tweet_id: tweet_id,
  } : skipToken)

  const ImagesTweet = useMemo(() => {
    return tweetDetail?.data[0].medias.map((image) => {
      return {
        original: image
      }
    })
  }, [tweetDetail])

  const checkBookmark = (bookmarks: Like[]) => {
    return bookmarks?.some(item => item.user_id === user_id)
  }
  const listIcons = [
    {
      id: 3,
      title: 'Like',
      icon: <Icons.IoIosHeartEmpty size={21} />,
      numberOfTurns: tweetDetail?.data[0].like_count
    },
    {
      id: 4,
      title: 'View',
      icon: <Icons.CiViewList size={21} />,
      numberOfTurns: tweetDetail?.data[0].user_views
    },
    {
      id: 5,
      title: 'Bookmark',
      icon: checkBookmark(tweetDetail?.data[0].bookmarks as Like[]) ? <Icons.FaBookmark size={21} /> : <Icons.FaRegBookmark size={21} />,
    },
  ]

  const checkLike = (Likes: Like[]) => {
    return Likes?.some(item => item.user_id === user_id)
  }

  const renderTextLike = (like_comment: LikeComment[]) => {
    const findUerLike = like_comment.filter(item => item.user_id === user_id)
    if (findUerLike.length === 0) {
      return 'Thích'
    }
    else {
      if (findUerLike[0].icon === '👍') {
        return 'Thích';
      } else if (findUerLike[0].icon === '❤️') {
        return 'Yêu thích';
      } else if (findUerLike[0].icon === '😂') {
        return 'Haha';
      } else if (findUerLike[0].icon === '😢') {
        return 'Buồn';
      } else {
        return 'Thất vọng';
      }
    }
  }
  const renderColorLike = (icon: string, like_comment: LikeComment[]) => {
    return like_comment.some(item => item.user_id === user_id && item.icon === icon)
  }

  const handleIcons = async (title: string) => {

    const map = new Map([
      ['Like', async () => {
        if (checkLike(tweetDetail?.data[0].likes as Like[])) {
          await unLikeTweet({ tweet_id: tweetDetail?.data[0]._id })
        } else {
          await likeTweet({ tweet_id: tweetDetail?.data[0]._id })
        }
      }],
      ['Bookmark', async () => {
        if (checkBookmark(tweetDetail?.data[0].bookmarks as Like[])) {
          await unBookmarkTweet({ tweet_id: tweetDetail?.data[0]._id, user_id })
        } else {
          await bookmarkTweet({ tweet_id: tweetDetail?.data[0]._id, user_id })
        }
      }],
    ])
    const action = map.get(title)
    if (action) {
      action()
    }
  }
  const handleFilerIcon = (listIcon: LikeComment[]) => {
    const icons = listIcon.map(icon => icon.icon)
    return Array.from(new Set(icons))

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
        tweet_id: tweet_id as string,
        user_id: user_id,
        content_comment: content,
        image_comment: file !== '' ? uploadImage[0].image : ''
      }).unwrap()
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
  const handleRepliesComment = (comment_id: string) => {
    setIsShowInputRepliesComment(comment_id)
  }
  const { handleLike, isHovered, isShowInputRepliesComment, handleSelectIcon, setIsShowInputRepliesComment, handleSelectIconRepliesComment } = useContext(ContextAPI)

  return (
    <div className="w-full h-[100vh] flex overflow-hidden ">
      <div className="flex-1 bg-black ">
        <div className="w-full flex items-center ">
          <div className="w-full fixed flex items-center  top-[30px] left-[30px] text-white cursor-pointer" onClick={() => navigate(PAGE.HOME)}>
            <Icons.IoMdClose size={30} />
            <img src={Images.logo} alt='logo' className="w-[50px]  ml-[10px] h-[50px] object-cover rounded-[50%]" onClick={() => navigate(PAGE.HOME)} />
          </div>

        </div>
        <div className="w-full  flex items-center justify-center">
          <div className="">
            {
              isLoading ? <div className=" mt-[100px]" ><Skeleton2 /> </div> : (ImagesTweet as { original: string }[])?.length > 0 ?
                <ImageGallery
                  items={ImagesTweet as { original: string }[]}
                  showThumbnails={false}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  showNav={true}
                  renderItem={(item) => (
                    <div className="custom-image-gallery-thumbnail">
                      <img
                        src={item.original}
                        alt={item.originalAlt}
                        style={{ height: '100vh', width: '700px' }}
                      />
                    </div>
                  )}
                /> : ''
            }
          </div>
        </div >
      </div>
      <div className="w-[420px]">
        {
          isLoading ? <div className="my-[50px]"><Skeleton /></div> : <div className="flex items-center ml-[20px]">
            <div className="w-[80px] h-full">
              <img src={tweetDetail?.data[0]?.users.avatar ? tweetDetail?.data[0]?.users.avatar : DEFAULT_IMAGE_AVATAR} className="w-[60px] h-[60px] object-cover rounded-[50%]" alt="avatar" />
            </div>
            <div >
              <div className="mt-[30px] font-fontFamily ">
                <h2 className="text-[18px]">{tweetDetail?.data[0]?.users.username}</h2>
                <p className="text-[15px] mx-1">@{tweetDetail?.data[0]?.users.name}</p>
              </div>
              <div className="text-[15px] mt-[30px] font-fontFamily text-#0F1419] leading-5">{tweetDetail?.data[0]?.content}</div>
            </div>
          </div>

        }

        <div className="mt-[50px] w-full py-[10px] border border-solid border-t-[1px] border-b-[1px] border-t-[#CED0D4] border-b-[#CED0D4]  flex justify-between items-center px-[20px]">
          {
            listIcons.map(item => {
              return <div key={item.id} onClick={() => handleIcons(item.title)} className={cn("flex items-center", {
                "hover:text-green2 ": item.title === 'Bookmark',
                "text-green2 ": checkBookmark(tweetDetail?.data[0].bookmarks as Like[]) && item.title === 'Bookmark',
                "hover:text-[#F91880] ": item.title === 'Like',
                "text-[#F91880] ": checkLike(tweetDetail?.data[0].likes as Like[]) && item.title === 'Like',
                "hover:text-[rgb(29,155,240)] ": item.title === 'View',
              })}>
                <div key={item.id} title={item.title} className={cn("w-[35px]  h-[35px]   flex items-center justify-center rounded-[50%] cursor-pointer", {
                  "hover:text-green2 hover:bg-[#b9daef]": checkBookmark(tweetDetail?.data[0].bookmarks as Like[]) && item.title === 'Bookmark',
                  "hover:text-[#F91880] hover:bg-[#e4a2c1]": item.title === 'Like',
                  " text-[#F91880]": checkLike(tweetDetail?.data[0].likes as Like[]) && item.title === 'Like',
                  "hover:text-[#4FA3DD] hover:bg-[#a8d0ee]": item.title === 'View',

                })}>
                  {item.icon}
                </div>
                <div className="text-[13px] font-fontFamily font-[500]">{item.numberOfTurns ? TotalNumber(item.numberOfTurns) : ''}</div>
              </div>
            })
          }
        </div>

        <div className='w-full flex-1 pb-[20px] overflow-y-scroll max-h-[600px]'>
          <div className='px-[20px]  cursor-pointer  w-full h-full'>
            {
              loading ? <div className="mt-[500px]"><Skeleton /></div> : <>
                {
                  getComment.length > 0 ? (getComment as Comment[]).map(comment => {
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
                          <div className='w-full items-center justify-between flex'>
                            <div className='w-[200px] mt-[5px] flex items-center justify-between'>
                              <p className='text-[15px] font-fontFamily'>{convertDateToHours(comment.created_at)}</p>
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
                                {
                                  isHovered === comment._id && <div className='absolute top-[-50px]'><ListIcons handleSelectIcon={handleSelectIcon} /></div>
                                }
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
                                <div className='font-[550] font-fontFamily ml-[5px]'>{comment.like_comments.length}</div>
                              </div>
                            }
                          </div>

                          <div className='w-full mt-[20px]'>
                            {
                              isShowInputRepliesComment === comment._id && (<>
                                <InputPost
                                  className="text-[17px] font-fontFamily  w-[100%] active:outline-none focus:outline-none rounded-lg border-none  resize-none bg-[#F0F2F5] p-[8px]"
                                  file={fileRepliesComment as File}
                                  setFile={setFileRepliesComment}
                                  avatar_user={tweetDetail?.data[0].users.avatar as string}
                                  content={RepliesContent}
                                  setContent={setRepliesContent}
                                  handleCreateComment={handleCreateRepliesComment}
                                />
                                <div className='relative'>
                                  {
                                    fileRepliesComment && <img src={typeof fileRepliesComment === 'string' ? fileRepliesComment : URL.createObjectURL(fileRepliesComment as File)} alt='flag-image' className='w-[100px] h-[50px] object-cover  rounded-[10px] ml-[50px] my-[5px]' />
                                  }
                                  <div className=' absolute right-[0px] top-[10px] cursor-pointer' onClick={() => setFileRepliesComment('')}>
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
                  }) : <div className='w-full h-full flex text-[20px] pt-[50px] items-center justify-center font-fontFamily font-[600] cursor-default'>{t('home.notComment')}</div>
                }
              </>
            }
          </div>
        </div>
        <div className="py-[10px] px-[10px] fixed bottom-0 w-[420px] " style={{ boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)" }}>
          <InputPost
            className="text-[17px] font-fontFamily  w-[100%] active:outline-none focus:outline-none rounded-lg border-none  resize-none bg-[#F0F2F5] p-[8px]"
            file={file as File}
            setFile={SetFile}
            avatar_user={tweetDetail?.data[0].users.avatar as string}
            handleCreateComment={handleCreateComment}
            content={content}
            setContent={setContent}
          />

          <div className='w-full flex justify-between'>
            {
              file && <img src={typeof file === 'string' ? file : URL.createObjectURL(file as File)} alt='flag-image' className='w-[100px] h-[50px] object-cover  rounded-[10px] ml-[50px] my-[5px]' />
            }
            <div className=' cursor-pointer' onClick={() => SetFile('')}>
              {
                file && <Icons.IoMdClose size={25} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

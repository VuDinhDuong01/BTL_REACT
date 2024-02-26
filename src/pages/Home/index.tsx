/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react"

import { GetCommentResponse, Post, initComment } from "../../components/post"
import { PostArticle } from "../../components/post-article"
import { cn } from "../../helps/cn"
import { useGetListTweetQuery } from "../../apis/tweet"
import { useLikeCommentMutation } from "../../apis/comment"
import { getProfileToLS } from "../../helps"

const actionArray = [
  { id: 1, title: 'For you' },
  { id: 2, title: 'Following' }
]
export const Home = () => {
  const [optionAction, setOptionAction] = useState<number>(1)
  const [likeComment] = useLikeCommentMutation()
  
  
  const [isHovered, setIsHovered] = useState<string>('')
  const [listComment, setListComment] = useState<{ data: GetCommentResponse, loading: boolean }>({
    data: initComment,
    loading: false
  })
  const [isShowInputRepliesComment, setIsShowInputRepliesComment] = useState<string>('')
  const handleOptionAction = (action: number) => {
    setOptionAction(action)
  }
  const { data: getListTweet } = useGetListTweetQuery({
    limit: 10,
    page: 1
  })

  // const handleShowListIcon = (_id_comment?: string) => {
  //   refSetTimeOut.current = setTimeout(() => {
  //     setIsHovered(_id_comment as string)
  //   }, 1300)
  // }
  // const handleHiddenListIcon = () => {
  //   clearTimeout(refSetTimeOut.current as number)
  //   setIsHovered('')
  // }

  const { user_id } = getProfileToLS() as { user_id: string }

  const handleLike = (_id_comment: string) => {
    setIsHovered(_id_comment)
    // try {
    //   await likeComment({ comment_id: _id_comment, user_id, icon: '👍' }).unwrap()
    // } catch (error: unknown) {
    //   console.log(error)
    // }
  }
  const handleLikeComment = async (_id_comment?: string, icon:string) => {
    try {
      console.log(icon)
      console.log(_id_comment)
      // await likeComment({ comment_id: _id_comment as string, user_id, icon: '👍' }).unwrap()
    } catch (error: unknown) {
      console.log(error)
    }
  }


  return (
    <div className="w-full">
      <div className="min-w-[611px] fixed z-[999] flex items-center  bg-white border-b-[1px] h-[55px]  justify-between  top-0 border-solid border-white1 border-t-transparent border-l-transparent border-r-transparent">
        {actionArray.map((action) => (
          <div
            className={cn('h-full w-full relative ', {
              'before:content-[""] before:absolute before:-bottom-[2px] before:w-full  before:left-0 before:h-[2px]  before:rounded-[2px] before:bg-green2':
                action.id === optionAction,
            })}
            key={action.id}
          >
            <div
              onClick={() => handleOptionAction(action.id)}
              className="h-full text-[18px] flex items-center justify-center cursor-pointer font-[700] font-fontFamily hover:bg-white1  "
            >
              {action.title}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[55px]">
        <PostArticle />
      </div>
      {
        getListTweet?.data?.map((tweet, index) => {
          return <div key={index}> <Post
            tweet={tweet}
            setListComment={setListComment}
            listComment={listComment}
            handleLike={handleLike}
            isHovered={isHovered}
            handleLikeComment={handleLikeComment}
            isShowInputRepliesComment={isShowInputRepliesComment}
            setIsShowInputRepliesComment={setIsShowInputRepliesComment}
          />
          </div>
        })
      }
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type Dispatch, type SetStateAction } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"

import { GetCommentResponse, Post } from "../../components/post"
import { PostArticle } from "../../components/post-article"
import { cn } from "../../helps/cn"
import { useGetListTweetQuery } from "../../apis/tweet"
import { useCreateLikeRepliesCommentMutation, useLikeCommentMutation } from "../../apis/comment"
import { getProfileToLS } from "../../helps"
import { queryList } from "../../hooks"
import { Button } from "../../components/ui/button"


const actionArray = [
  { id: 1, title: 'For you' },
  { id: 2, title: 'Following' }
]

interface TweetContext {
  handleLike: (_id_comment: string) => void
  isHovered: string
  isShowInputRepliesComment: string
  handleSelectIcon: (icon: string) => Promise<void>
  handleSelectIconRepliesComment: (icon: string) => Promise<void>
  setIsShowInputRepliesComment: Dispatch<SetStateAction<string>>
  listComment: {
    data: GetCommentResponse,
    loading: boolean

  },

}
const initComment = {
  data: {
    message: '',
    data: []
  },
  loading: false
}


const initContext = {
  handleLike: (_id_comment: string) => null,
  isHovered: '',
  isShowInputRepliesComment: '',
  handleSelectIcon: async (icon: string) => { },
  setIsShowInputRepliesComment: () => null,
  listComment: initComment,
  handleSelectIconRepliesComment: async (icon: string) => { }

}
export const TweetProvider = createContext<TweetContext>(initContext)
export const Home = () => {
  const [limits, setLimit] = useState<number>(Number(queryList.limit))
  const navigate = useNavigate()
  const [optionAction, setOptionAction] = useState<number>(1)
  const [likeComment] = useLikeCommentMutation()
  const [likeRepliesComment] = useCreateLikeRepliesCommentMutation()
  const [isHovered, setIsHovered] = useState<string>('')
  const [listComment, setListComment] = useState<{ data: GetCommentResponse, loading: boolean }>(initComment)
  const [isShowInputRepliesComment, setIsShowInputRepliesComment] = useState<string>('')
  const handleOptionAction = (action: number) => {
    setOptionAction(action)
  }
  const { user_id } = getProfileToLS()
  const { data: getListTweet } = useGetListTweetQuery({
    ...queryList,
    limit: limits,
    // page: nextPage,

  } as unknown as { limit: number, page: number })


  const handleLike = (_id_comment: string) => {
    setIsHovered(_id_comment)
  }

  const handleSelectIcon = async (icon: string) => {
    try {
      await likeComment({ comment_id: isHovered as string, user_id, icon: icon }).unwrap()
      setIsHovered('')
    }
    catch (error: unknown) {
      console.log(error)
    }
  }

  const handleSelectIconRepliesComment = async (icon: string) => {
    try {
      await likeRepliesComment({ user_id, icon, replies_comment_id: isHovered }).unwrap()
      setIsHovered('')
    }
    catch (error: unknown) {
      console.log(error)
    }
  }

  const handleNextPage = () => {
    setLimit(prev => {
      const nextLimit = prev + 3
      navigate({
        pathname: '',
        search: createSearchParams({
          ...queryList,
          limit: String(nextLimit)
        }).toString()
      });
      return nextLimit;
    });

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
      <TweetProvider.Provider value={{ handleLike, isHovered, isShowInputRepliesComment, handleSelectIcon, setIsShowInputRepliesComment, listComment, handleSelectIconRepliesComment }}>
        {
          getListTweet?.data?.map((tweet, index) => {
            return <div key={index}> <Post
              tweet={tweet}
              setListComment={setListComment}

            />
            </div>
          })
        }
      </TweetProvider.Provider>
      {
        getListTweet !== undefined && Number(limits) < Number(getListTweet?.total_records) && (<div className="w-full justify-center flex items-center my-[50px]">
          <Button onClick={handleNextPage} className="w-[200px] font-fontFamily font-[600] !text-[20px] bg-[#1B90DF] text-white cursor-pointer hover:opacity-80">Loading...</Button>
        </div>)
      }
  
    </div>
  )
}

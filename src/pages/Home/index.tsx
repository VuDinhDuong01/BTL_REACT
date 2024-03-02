/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"

import { Post } from "../../components/post"
import { PostArticle } from "../../components/post-article"
import { cn } from "../../helps/cn"
import { useGetListTweetQuery } from "../../apis/tweet"
import { ProviderContext, queryList } from "../../hooks"
import { Button } from "../../components/ui/button"
import { Skeleton } from "../../components/ui/skeleton"


const actionArray = [
  { id: 1, title: 'For you' },
  { id: 2, title: 'Following' }
]

export const Home = () => {
  const [limits, setLimit] = useState<number>(Number(queryList.limit))
  const navigate = useNavigate()
  const [optionAction, setOptionAction] = useState<number>(1)

  const handleOptionAction = (action: number) => {
    setOptionAction(action)
  }

  const { data: getListTweet, isLoading } = useGetListTweetQuery({
    ...queryList,
    limit: limits,
  } as unknown as { limit: number, page: number })

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

      {
        isLoading ? <div className="w-full h-full flex items-center justify-center mt-[200px]"><Skeleton /></div> : <>
          <ProviderContext>
            {
              getListTweet?.data?.map((tweet, index) => {
                return <div key={index}> <Post
                  tweet={tweet}
                />
                </div>
              })
            }
          </ProviderContext>
          {
            getListTweet !== undefined && Number(limits) < Number(getListTweet?.total_records) && (<div className="w-full justify-center flex items-center my-[50px]">
              <Button onClick={handleNextPage} className="w-[200px] font-fontFamily font-[600] !text-[20px] bg-[#1B90DF] text-white cursor-pointer hover:opacity-80">Loading...</Button>
            </div>)
          }
        </>
      }


    </div>
  )
}

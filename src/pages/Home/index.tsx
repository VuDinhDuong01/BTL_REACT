/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import { t } from "i18next";
import omit from 'lodash/omit'

import { Post } from "../../components/post"
import { PostArticle } from "../../components/post-article"
import { cn } from "../../helps/cn"
import { useGetListTweetQuery } from "../../apis/tweet"
import {  queryList } from "../../hooks"
import { Button } from "../../components/ui/button"
import { Skeleton } from "../../components/ui/skeleton"
import { getProfileToLS } from "../../helps"
import { GenerateType } from "../../types/generate";
import { Tweet } from "../../types/tweet";

interface ActionTweet {
  id: number,
  title: string
  title_tweet: string
}

export const Home = () => {
  const actionArray: ActionTweet[] = [
    { id: 1, title: t('home.forYou'), title_tweet: 'for_you' },
    { id: 2, title: t('home.following'), title_tweet: 'following' }
  ]
  const [limits, setLimit] = useState<number>(Number(queryList.limit))
  const [titleTweet, setTitleTweet] = useState<string>(String(queryList.title_tweet))
  const profile = getProfileToLS() as { user_id: string }
  const navigate = useNavigate()
  const [optionAction, setOptionAction] = useState<number>(1)
  const { data: getListTweet, isLoading } = useGetListTweetQuery({
    ...queryList,
    limit: limits,
    title_tweet: titleTweet,
    id_user: profile.user_id as string
  } as unknown as { limit: number, page: number, title_tweet: string, id_user: string })

  const handleOptionAction = (action: ActionTweet) => {
    setOptionAction(action.id)
    setTitleTweet(action.title_tweet)
    navigate({
      pathname: '',
      search: createSearchParams(omit({
        ...queryList,
        title_tweet: action.title_tweet,
        id_user: profile.user_id as string
      },['order','sort_by','name','content','content_comment'])).toString()
    });
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
      <div className="min-w-[611px] z-10 flex items-center  bg-white border-b-[1px] h-[55px]  justify-between fixed  top-0 border-solid border-white1 border-t-transparent border-l-transparent border-r-transparent">
        {actionArray.map((action) => (
          <div
            className={cn('h-full w-full relative  ', {
              'before:content-[""] before:absolute before:-bottom-[2px] before:w-full   before:left-0 before:h-[2px]  before:rounded-[2px] before:bg-green2':
                action.id === optionAction,
            })}
            key={action.id}
          >
            <div
              onClick={() => handleOptionAction(action)}
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
        isLoading ? <div className="w-full h-full flex items-center justify-center mt-[200px]"><Skeleton /></div> :
          <>
            {
              (getListTweet as GenerateType<Tweet[]>)?.data?.length > 0 ? <>
                  {
                    getListTweet?.data?.map((tweet, index) => {
                      return <div key={index}>
                        <Post
                          tweet={tweet}
                        />

                      </div>
                    })
                  }
                {
                  getListTweet !== undefined && Number(limits) < Number(getListTweet?.total_records) && (<div className="w-full justify-center flex items-center my-[50px]">
                    <Button onClick={handleNextPage} className="w-[200px] font-fontFamily font-[600] !text-[20px] bg-[#1B90DF] text-white cursor-pointer hover:opacity-80">{t('home.loading')}...</Button>
                  </div>)
                }
              </> : <div className="w-full items-center flex justify-center font-fontFamily font-[600] text-[20px] mt-[100px]">{t('home.notPost')}</div>
            }
          </>
      }


    </div>
  )
}

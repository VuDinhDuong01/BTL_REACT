import { useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";

import { useGetBookmarkQuery } from "../../apis/bookmark";
import { Post } from "../../components/post";
import { getProfileToLS } from "../../helps";
import { ProviderContext, queryList } from "../../hooks";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import { GenerateType } from "../../types/generate";
import { Tweet } from "../../types/tweet";
import omit from 'lodash/omit'

const Bookmark = () => {

    const profile = getProfileToLS() as { username?: string, user_id?: string }
    const [limits, setLimit] = useState<number>(Number(queryList.limit) ?? 10)
    const navigate = useNavigate()
    const { user_id } = useParams()
    const { data: getBookmark, isLoading } = useGetBookmarkQuery({
        ...queryList,
        limit: limits,
        user_id: user_id
    } as unknown as { limit: number, page: number, user_id: string })

    const handleNextPage = () => {
        setLimit(prev => {
            const nextLimit = prev + 10
            navigate({
                pathname: '',
                search: createSearchParams(omit({
                    ...queryList,
                    limit: String(nextLimit)
                }, ['id_user', 'for_you', 'title_tweet', 'order', 'sort_by', 'name', 'content', 'content_comment', 'title'])).toString()
            });
            return nextLimit;
        });
    }
    return (
        <div className="w-full ">
            <div className="min-w-[611px]  fixed  flex items-center  bg-white border-b-[1px] h-[55px]  justify-between  top-0 border-solid border-white1 border-t-transparent border-l-transparent border-r-transparent">
                <div>
                    <div className="h-full text-[18px]  cursor-pointer font-[700] font-fontFamily hover:bg-white1 ">
                        <h3>Bookmark</h3>
                        <h5 className="text-[#536471] text-[13px] leading-3">@{profile.username}</h5>
                    </div>
                </div>
            </div>
            {
                isLoading ? <div className="w-full h-full flex items-center  justify-center mt-[200px]"><Skeleton /></div> : <>{
                    (getBookmark as GenerateType<Tweet[]>)?.data.length > 0 ? <>
                        <div className="mt-[55px]">
                            <ProviderContext>
                                {
                                    getBookmark?.data?.map((tweet, index) => {
                                        return <div key={index}> <Post
                                            tweet={tweet}
                                        />
                                        </div>
                                    })
                                }
                            </ProviderContext>
                        </div>
                        {
                            getBookmark !== undefined && Number(limits) < Number(getBookmark?.total_records) && (<div className="w-full justify-center flex items-center my-[50px]">
                                <Button onClick={handleNextPage} className="w-[200px] font-fontFamily font-[600] !text-[20px] bg-[#1B90DF] text-white cursor-pointer hover:opacity-80">Loading...</Button>
                            </div>)
                        }
                    </> : <div className='w-full h-full flex text-[20px] text-black  mt-[200px] items-center justify-center font-fontFamily font-[600] cursor-default'>Không có bài bookmark nào</div>
                }
                </>
            }
        </div>
    )
}

export default Bookmark;
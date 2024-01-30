import { useMemo } from "react";

import { useGetBookmarkQuery } from "../../apis/bookmark";
import { Post } from "../../components/post";
import { getProfileToLS } from "../../helps";


const Bookmark = () => {
    const profile = getProfileToLS() as { username?: string, user_id: string }
    const { data: getBookmark } = useGetBookmarkQuery()
    const getBookmarks = useMemo(() => {
        return getBookmark?.data.map(item => {
            return {
                like_count: item.like_count,
                {...item.bookmark[0]}

            }
        })
    }, [getBookmark])
return (
    <div className="w-full ">
        <div className="min-w-[611px] fixed z-[999] flex items-center  bg-white border-b-[1px] h-[55px]  justify-between  top-0 border-solid border-white1 border-t-transparent border-l-transparent border-r-transparent">
            <div>
                <div className="h-full text-[18px]  cursor-pointer font-[700] font-fontFamily hover:bg-white1 ">
                    <h3>Bookmark</h3>
                    <h5 className="text-[#536471] text-[13px] leading-3">@{profile.username}</h5>
                </div>
            </div>

        </div>
        {
            getBookmark?.data.map(tweet => {
                return <div key={tweet.bookmark[0]._id}> <Post tweet={getBookmarks} />
                </div>
            })
        }
    </div>
)
}

export default Bookmark;
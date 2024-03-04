import { useParams, useNavigate } from "react-router-dom"
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { skipToken } from "@reduxjs/toolkit/query";
import { useMemo } from "react";

import { Icons } from "../../helps/icons"
import { Images } from "../../assets/images"
import { PAGE } from "../../contants"
import { useGetTweetDetailQuery } from "../../apis/tweet";
import { Skeleton2 } from "../../components/ui/skeleton";
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default";
import { Like } from "../../types/tweet";
import { cn } from "../../helps/cn";
import { getProfileToLS } from "../../helps";
import { TotalNumber } from "../../helps/sum-total-number";
import { useLikeMutation, useUnLikeMutation } from "../../apis/like";
import { useBookmarkMutation, useUnBookmarkMutation } from "../../apis/bookmark";


export const TweetDetail = () => {
  const [likeTweet] = useLikeMutation()
  const [unLikeTweet] = useUnLikeMutation()
  const [bookmarkTweet] = useBookmarkMutation()
  const [unBookmarkTweet] = useUnBookmarkMutation()
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
  return (
    <div className="w-full h-[100vh] flex">
      <div className="!min-w-[1500px] bg-black overflow-hidden ">
        <div className="w-full flex items-center ">
          <div className="w-full fixed flex items-center  top-[30px] left-[30px] text-white cursor-pointer" onClick={() => navigate(PAGE.HOME)}>
            <Icons.IoMdClose size={30} />
            <img src={Images.logo} alt='logo' className="w-[50px]  ml-[10px] h-[50px] object-cover rounded-[50%]" onClick={() => navigate(PAGE.HOME)} />
          </div>

        </div>
        <div className="w-full overflow-hidden flex items-center justify-center">
          <div className="h-[100vh]">
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
      <div className="flex-1 ">
        <div className="flex items-center ml-[20px]">
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
      </div>
    </div>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { Icons } from "../../helps/icons"
import { TotalNumber } from "../../helps/sum-total-number"
import { cn } from "../../helps/cn"
import { DivideImageSize } from "../../helps/divide-size-image"
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default"
import { useLikeMutation, useUnLikeMutation } from "../../apis/like"
import { useBookmarkMutation, useUnBookmarkMutation } from "../../apis/bookmark"
import { PopupComment, ShowPopupComment } from "../ui/dialog-comment"
import { Like, Tweet } from "../../types/tweet"
import { getProfileToLS } from "../../helps"
import { Comment } from "../../types/comment"
import { GenerateType } from "../../types/generate"
import { ContextAPI } from "../../hooks"
import { ViewIcon } from "../../assets/icons/eye"

interface Props {
    tweet: Tweet,
}
export type GetCommentResponse = GenerateType<Comment[]>
export interface NotificationType {
    tweet_id?: string,
    sender_id?: string
    to: string
    username: string
    avatar: string
    status: string,
    from?: string
}
export const Post = ({ tweet }: Props) => {
    const refShowPopupComment = useRef<ShowPopupComment>(null)
    const { user_id, username, avatar } = getProfileToLS() as { user_id: string, username: string, avatar: string }
    const [likeTweet] = useLikeMutation()
    const [unLikeTweet] = useUnLikeMutation()
    const [bookmarkTweet] = useBookmarkMutation()
    const [unBookmarkTweet] = useUnBookmarkMutation()
    const { socket } = useContext(ContextAPI)
    const checkBookmark = (bookmarks: Like[]) => {
        return bookmarks?.some(item => item.user_id === user_id)
    }

    const listIcons = [
        {
            id: 1,
            title: 'Reply',
            icon: <Icons.BiMessageRounded size={21} />,
            numberOfTurns: tweet?.comment_count
        },
        {
            id: 2,
            title: 'Repost',
            icon: <Icons.PiShareFat size={21} />,
            numberOfTurns: 12000
        },
        {
            id: 3,
            title: 'Like',
            icon: <Icons.IoIosHeartEmpty size={21} />,
            numberOfTurns: tweet.like_count
        },
        {
            id: 4,
            title: 'View',
            icon: <ViewIcon  />,
            numberOfTurns: tweet.user_views
        },
        {
            id: 5,
            title: 'Bookmark',
            icon: checkBookmark(tweet.bookmarks as Like[]) ? <Icons.FaBookmark size={21} /> : <Icons.FaRegBookmark size={21} />,
        },
    ]
    const checkLike = (Likes: Like[]) => {
        return Likes?.some(item => item.user_id === user_id)
    }


    const navigate = useNavigate()
    const handleIcons = async (title: string) => {

        const map = new Map([
            ['Like', async () => {
                if (checkLike(tweet.likes as Like[])) {
                    await unLikeTweet({ tweet_id: tweet._id }).unwrap()
                } else {
                    tweet.user_id !== user_id && socket?.emit("send_notification_like", {
                        tweet_id: tweet._id,
                        to: tweet.user_id,
                        username: username,
                        avatar: avatar,
                        status: 'like'
                    })

                    await likeTweet({ tweet_id: tweet._id }).unwrap()
                }
            }],
            ['Bookmark', async () => {
                if (checkBookmark(tweet.bookmarks as Like[])) {
                    await unBookmarkTweet({ tweet_id: tweet._id, user_id }).unwrap()
                } else {
                    tweet.user_id !== user_id && socket?.emit("send_notification_bookmark", {
                        tweet_id: tweet._id,
                        to: tweet.user_id,
                        username: username,
                        avatar: avatar,
                        status: 'bookmark'
                    })
                    await bookmarkTweet({ tweet_id: tweet._id, user_id }).unwrap()
                }
            }],
            [
                'Reply', async () => {
                    if (refShowPopupComment.current) {
                        refShowPopupComment.current.showPopup()
                    }
                }
            ]
        ])
        const action = map.get(title)
        if (action) {
            action()
        }
    }

    const handleNavigateDetail = (tweet_id: string) => {
        navigate(`/tweet/${tweet_id}`)
    }

    return (
        <div className="px-[10px] w-full flex  pt-[15px] hover:bg-white1 cursor-pointer border-solid border-b-[1px] border-b-white1 bg-transparent border-t-transparent border-r-transparent border-l-transparent">
            <PopupComment ref={refShowPopupComment} tweet_id={tweet._id} id_user={tweet.user_id} users={tweet?.users} />
            <div className="w-[80px] h-full flex items-center ">
                <img src={tweet?.users?.avatar ? tweet.users?.avatar : DEFAULT_IMAGE_AVATAR} className="w-[60px] h-[60px] object-cover rounded-[50%]" alt="avatar" />
            </div>
            <div className="flex-1">
                <div onClick={() => handleNavigateDetail(tweet._id)}>
                    <div className="mt-[8px]">
                        <div className=" w-full flex items-center font-fontFamily">
                            <h2 className="text-[18px]">{tweet.users?.username}</h2>
                            <p className="text-[15px] mx-1">@{tweet.users?.name}</p>
                        </div>
                        <p className="font-fontFamily text-[16px] pt-[5px]">{tweet.users?.bio}</p>
                    </div>
                    <div className="text-[15px] mt-[30px] font-fontFamily text-#0F1419] leading-5">{tweet?.content}</div>
                    <div className="w-full mt-[20px] cursor-pointer">
                        {
                            tweet?.medias?.length > 0 && DivideImageSize({ arrayImage: tweet?.medias })

                            // <img  className="w-full" src="https://media1.giphy.com/media/BoCGrhPGv4BHpGkPQl/200_d.gif?cid=512b868f2e9vyu08ljlvkz09vavbyg31w2xxxjb64slr19x1&ep=v1_gifs_trending&rid=200_d.gif&ct=g" alt="" />
                            //    <VideoPlayer url='https://media1.giphy.com/media/BoCGrhPGv4BHpGkPQl/200_d.gif?cid=512b868f2e9vyu08ljlvkz09vavbyg31w2xxxjb64slr19x1&ep=v1_gifs_trending&rid=200_d.gif&ct=g' /> 

                        }
                    </div>
                </div>

                <div className="w-full py-[10px]  flex justify-between items-center">
                    {
                        listIcons.map(item => {
                            return <div key={item.id} onClick={() => {
                                handleIcons(item.title)

                            }

                            } className={cn("flex items-center", {
                                "hover:text-green2 ": item.title === 'Bookmark',
                                "text-green2 ": checkBookmark(tweet.bookmarks as Like[]) && item.title === 'Bookmark',
                                "hover:text-[#1D9BF0] ": item.title === 'Reply',
                                "hover:text-[#47CDA0] ": item.title === 'Repost',
                                "hover:text-[#F91880] ": item.title === 'Like',
                                "text-[#F91880] ": checkLike(tweet.likes as Like[]) && item.title === 'Like',
                                "hover:text-[rgb(29,155,240)] ": item.title === 'View',
                            })}>
                                <div key={item.id} title={item.title} className={cn("w-[35px]  h-[35px]   flex items-center justify-center rounded-[50%] cursor-pointer", {
                                    "hover:text-green2 hover:bg-[#b9daef]": checkBookmark(tweet.bookmarks as Like[]) && item.title === 'Bookmark',
                                    "hover:text-[#1D9BF0] hover:bg-[#98c8e7]": item.title === 'Reply',
                                    "hover:text-[#47CDA0] hover:bg-[#b1e5d4]": item.title === 'Repost',
                                    "hover:text-[#F91880] hover:bg-[#e4a2c1]": item.title === 'Like',
                                    " text-[#F91880]": checkLike(tweet.likes as Like[]) && item.title === 'Like',
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
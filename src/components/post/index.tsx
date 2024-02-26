/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { Icons } from "../../helps/icons"
import { TotalNumber } from "../../helps/sum-total-number"
import { cn } from "../../helps/cn"
import { DivideImageSize } from "../../helps/divide-size-image"
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default"
import { useLikeMutation, useUnLikeMutation } from "../../apis/like"

import { useBookmarkMutation, useUnBookmarkMutation } from "../../apis/bookmark"
import { useState, useRef, useMemo, createContext, type SetStateAction, type Dispatch } from "react"
import { PopupComment, ShowPopupComment } from "../ui/dialog-comment"
import { Like, Tweet } from "../../types/tweet"
import { getProfileToLS } from "../../helps"
import { useGetCommentMutation } from "../../apis/comment"
import { Comment } from "../../types/comment"
import { GenerateType } from "../../types/generate"
interface Props {
    tweet: Tweet,
    setListComment: Dispatch<SetStateAction<{
        data: GetCommentResponse;
        loading: boolean;
    }>>
    listComment: {
        data: GetCommentResponse;
        loading: boolean;
    },
    handleLike: (_id_comment: string) =>void

    isHovered: string
    handleLikeComment:(_id_comment?: string ,icon:string)=> Promise<void>
    // handleShowListIcon: (_id_comment?: string) => void,
    // handleHiddenListIcon: () => void
    isShowInputRepliesComment: string
    setIsShowInputRepliesComment: Dispatch<SetStateAction<string>>,
}

export const initComment = {
    message: '',
    data: []
}

export type GetCommentResponse = GenerateType<Comment[]>
export const ContextProvider = createContext<{ data: GetCommentResponse, loading: boolean, }>({
    data: initComment,
    loading: false
})
export const Post = ({ tweet, setListComment, listComment, handleLike, isHovered , isShowInputRepliesComment, setIsShowInputRepliesComment ,handleLikeComment}: Props) => {
    const refShowPopupComment = useRef<ShowPopupComment>(null)
    const profile = getProfileToLS() as { user_id: string, username: string }
    const [likeTweet] = useLikeMutation()
    const [unLikeTweet] = useUnLikeMutation()
    const [bookmarkTweet] = useBookmarkMutation()
    const [unBookmarkTweet] = useUnBookmarkMutation()
    const [getComment, { isLoading }] = useGetCommentMutation()
    const checkLike = useMemo(() => {
        return tweet?.likes?.some(item => item.user_id === profile.user_id)
    }, [tweet.likes])
    const checkBookmark = useMemo(() => {
        return (tweet?.bookmarks as Like[])?.some(item => item.user_id === profile.user_id)
    }, [tweet.bookmarks])
    const [like, setLike] = useState<boolean>(checkLike)
    const [bookmark, setBookMark] = useState<boolean>(checkBookmark)

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
            icon: <Icons.BiRepost size={21} />,
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
            icon: <Icons.CiViewList size={21} />,
            numberOfTurns: 12
        },
        {
            id: 5,
            title: 'Bookmark',
            icon: bookmark ? <Icons.FaBookmark size={21} /> : <Icons.FaRegBookmark size={21} />,
        },
    ]
    const handleIcons = async (title: string) => {
        const map = new Map([
            ['Like', async () => {
                setLike(!like)
                if (like) {
                    await unLikeTweet({ tweet_id: tweet._id })
                } else {
                    await likeTweet({ tweet_id: tweet._id })
                }
            }],
            ['Bookmark', async () => {
                setBookMark(!bookmark)
                if (bookmark) {
                    await unBookmarkTweet({ tweet_id: tweet._id })
                } else {
                    await bookmarkTweet({ tweet_id: tweet._id })
                }
            }],
            [
                'Reply', async () => {
                    if (refShowPopupComment.current) {
                        refShowPopupComment.current.showPopup()
                        const response = await getComment({
                            tweet_id: tweet._id,
                            limit: 50,
                            page: 1
                        }).unwrap()
                        setListComment({ data: response, loading: isLoading })
                    }
                }
            ]
        ])
        const action = map.get(title)
        if (action) {
            action()
        }
    }

    return (
        <div className="px-[10px] w-full flex  pt-[15px] hover:bg-white1 cursor-pointer border-solid border-b-[1px] border-b-white1 bg-transparent border-t-transparent border-r-transparent border-l-transparent">
            <ContextProvider.Provider value={listComment}>
                <PopupComment ref={refShowPopupComment}  handleLike={handleLike} isHovered={isHovered}  tweet_id={tweet._id} users={tweet?.users} setIsShowInputRepliesComment={setIsShowInputRepliesComment} isShowInputRepliesComment={isShowInputRepliesComment} handleLikeComment={handleLikeComment} />
            </ContextProvider.Provider>

            <div className="w-[80px] h-full flex items-center ">
                <img src={tweet?.users?.avatar ? tweet.users?.avatar : DEFAULT_IMAGE_AVATAR} className="w-[60px] h-[60px] object-cover rounded-[50%]" alt="avatar" />
            </div>
            <div className="flex-1">
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
                        tweet?.medias.length > 0 && DivideImageSize({ arrayImage: tweet?.medias })
                        // : <VideoPlayer url='https://youtu.be/Vt4kAu-ziRY?si=R5w38MhUA4bV_HvM'  /> 
                    }
                </div>
                <div className="w-full py-[10px]  flex justify-between items-center">
                    {
                        listIcons.map(item => {
                            return <div key={item.id} onClick={() => handleIcons(item.title)} className={cn("flex items-center", {
                                "hover:text-green2 ": item.title === 'Bookmark',
                                "text-green2 ": bookmark && item.title === 'Bookmark',
                                "hover:text-[#1D9BF0] ": item.title === 'Reply',
                                "hover:text-[#47CDA0] ": item.title === 'Repost',
                                "hover:text-[#F91880] ": item.title === 'Like',
                                "text-[#F91880] ": like && item.title === 'Like',
                                "hover:text-[rgb(29,155,240)] ": item.title === 'View',
                            })}>
                                <div key={item.id} title={item.title} className={cn("w-[35px]  h-[35px]   flex items-center justify-center rounded-[50%] cursor-pointer", {
                                    "hover:text-green2 hover:bg-[#b9daef]": checkBookmark && item.title === 'Bookmark',
                                    "hover:text-[#1D9BF0] hover:bg-[#98c8e7]": item.title === 'Reply',
                                    "hover:text-[#47CDA0] hover:bg-[#b1e5d4]": item.title === 'Repost',
                                    "hover:text-[#F91880] hover:bg-[#e4a2c1]": item.title === 'Like',
                                    " text-[#F91880]": checkLike && item.title === 'Like',
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
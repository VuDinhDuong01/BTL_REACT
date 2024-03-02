/* eslint-disable no-extra-boolean-cast */
import { useRef, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"

import { Button } from "../../../components/ui/button"
import { Icons } from "../../../helps/icons"
import { Link, useParams } from "react-router-dom"
import { PAGE } from "../../../contants"
import { PopupUpdateMe, ShowPopupHandle } from "../../../components/ui/dialog-form-update-me"
import { useGetMeQuery, useGetTweetUserQuery } from "../../../apis"
import { DEFAULT_IMAGE_AVATAR } from "../../../helps/image-user-default"
import { GetUserResponse } from "../../../types/user"
import { Skeleton } from "../../../components/ui/skeleton"
import { cn } from "../../../helps/cn"
import { ProviderContext, queryList } from "../../../hooks"
import { Post } from "../../../components/post"
import { GenerateType } from "../../../types/generate"
import { Tweet } from "../../../types/tweet"


const actionTweet = [
    { id: 1, title: 'Posts' },
    { id: 2, title: 'Comments' },
    { id: 3, title: 'Likes' },
]

export const Personal = () => {
    const navigate = useNavigate()
    const [optionAction, setOptionAction] = useState<number>(1)
    const [title, setTitle] = useState<string>(String(queryList.title))
    const { user_id } = useParams()
    const [limits, setLimit] = useState<number>(Number(queryList.limit))
    const { data: getMe, isLoading } = useGetMeQuery({
        user_id: user_id as string
    })
    const { data: getTweetUser, isLoading: isLoadingGetTweetUser } = useGetTweetUserQuery(
        {
            ...queryList,
            title: title,
            limit: String(limits),
            user_id: user_id as string
        }
    )
    const showPopupUpdateMe = useRef<ShowPopupHandle>(null)

    const handleShowPopup = () => {
        if (showPopupUpdateMe.current) {
            showPopupUpdateMe.current.showPopup()
        }
    }
    const handleOptionAction = (action: { id: number, title: string }) => {
        setTitle(action.title)
        setOptionAction(action.id)
        navigate({
            pathname: '',
            search: createSearchParams({
                ...queryList,
                title: action.title
            }).toString()
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
    return <div className="w-full">
        <PopupUpdateMe ref={showPopupUpdateMe} dataMe={getMe as GetUserResponse} />
        <div className="w-full">
            {
                isLoading ? <div className="flex w-full h-full items-center justify-center m-auto">< Skeleton /></div> : <>
                    <div className=" w-[611px] z-[9999] flex items-center h-[60px] fixed top-0 bg-white">
                        <Link to={PAGE.HOME} className="!text-black cursor-pointer ml-[10px]">
                            <Icons.FaArrowLeftLong />
                        </Link>
                        <div className="ml-[20px] mt-[10px] ">
                            <h2 className="text-[20px] font-fontFamily ">{getMe?.data.name}</h2>
                            <p className="text-[15px] font-fontFamily text-black2">4 posts</p>
                        </div>
                    </div>
                    <div className="w-full relative !z-[-999] mt-[55px]">
                        {
                            Boolean(getMe?.data.cover_photo as string) ? <img src={getMe?.data.cover_photo} alt="cover_photo" className="w-full h-[200px] mt-[20px] object-cover" /> : <div className="w-full h-[200px] mt-[20px] bg-[#CFD9DE] z-0 " />
                        }
                        <img src={Boolean(getMe?.data.avatar as string) ? getMe?.data.avatar : DEFAULT_IMAGE_AVATAR} alt="avatar" className="w-[100px] h-[100px] absolute object-cover rounded-[50%] border-[1px] border-solid border-white left-0 bottom-[-50px] ml-[20px] " />
                    </div>
                    <div className=" flex justify-end ">

                        <Button className="!text-[16px] mr-[10px] !text-black2 !font-[700] font-fontFamily bg-transparent   !border-[2px] !border-solid 
             !border-black1 !w-[150px] !h-[40px] !rounded-[50px] cursor-pointer mt-[10px] hover:bg-[#F7F9F9]" onClick={handleShowPopup}>Edit profile</Button>
                    </div>

                    <div className="mt-[20px] ml-[10px]">
                        <h2 className="text-[20px] font-fontFamily ">{getMe?.data.name}</h2>
                        <p className="text-[15px] font-fontFamily text-black2">@{getMe?.data.username}</p>
                        <p className="text-[15px] font-fontFamily text-black2 mt-[15px]">{getMe?.data.bio}</p>
                        <div className="flex items-center mt-[15px]">
                            <div className="flex items-center">
                                <Icons.FiMapPin size={17} />
                                <p className="text-[16px]  text-black3 font-fontFamily ml-[5px] mr-[20px]">{Boolean(getMe?.data.location) ? getMe?.data.location : 'Việt Nam'}</p>
                            </div>
                            <div className="flex items-center">
                                <Icons.CgWebsite size={17} />
                                <p className="text-[16px] font-fontFamily ml-[5px] mr-[20px] text-black3">{getMe?.data.website ?? ''}</p>
                            </div>
                        </div>

                        <div className="flex items-center mt-[15px]">
                            <div className="flex items-center">
                                <p className="text-[15px] font-[700] font-fontFamily ml-[5px]  ">3</p>
                                <p className="text-[15px] font-fontFamily ml-[5px] mr-[20px] text-black3">Following</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-[15px] font-[700] font-fontFamily ml-[5px]  ">3</p>
                                <p className="text-[15px] font-fontFamily ml-[5px] mr-[20px] text-black3" >Followers</p>
                            </div>
                        </div>

                    </div>
                </>
            }
            <div className="w-full flex items-center justify-between h-[40px] mt-[50px] mb-[20px]">
                {actionTweet.map((action) => (
                    <div
                        className={cn('h-full w-full relative ', {
                            'before:content-[""] before:absolute before:-bottom-[2px] before:w-full  before:left-0 before:h-[2px]  before:rounded-[2px] before:bg-green2':
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
            {
                (getTweetUser as GenerateType<Tweet[]>)?.data.length > 0 ? <>
                    {
                        isLoadingGetTweetUser ? <div className="w-full h-full flex items-center justify-center mt-[200px]"><Skeleton /></div> : <>
                            <ProviderContext>
                                {
                                    getTweetUser?.data?.map((tweet, index) => {
                                        return <div key={index}> <Post
                                            tweet={tweet}
                                        />
                                        </div>
                                    })
                                }
                            </ProviderContext>
                            {
                                getTweetUser !== undefined && Number(limits) < Number(getTweetUser?.total_records) && (<div className="w-full justify-center flex items-center my-[50px]">
                                    <Button onClick={handleNextPage} className="w-[200px] font-fontFamily font-[600] !text-[20px] bg-[#1B90DF] text-white cursor-pointer hover:opacity-80">Loading...</Button>
                                </div>)
                            }
                        </>
                    }
                </> : <div className="w-full items-center flex justify-center mt-[100px] text-[20px] text-black font-[600] font-fontFamily">Không có bài Post nào</div>

            }
        </div>
    </div>
}
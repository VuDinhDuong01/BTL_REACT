/* eslint-disable no-extra-boolean-cast */
import { useRef, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import { t } from 'i18next'
import omit from 'lodash/omit'

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
import { getProfileToLS } from "../../../helps"
import { useFollowMutation, useGetFollowQuery } from "../../../apis/follow"



export const Personal = () => {

    const actionTweet = [
        { id: 1, title: 'Posts' },
        { id: 2, title: 'Comments' },
        { id: 3, title: 'Like' },
    ]
    const navigate = useNavigate()
    const [follow] = useFollowMutation()
    const { data: getFollow } = useGetFollowQuery()
    const [optionAction, setOptionAction] = useState<number>(1)
    const [title, setTitle] = useState<string>(String(queryList.title))
    const { user_id } = useParams()
    const profile = getProfileToLS() as { user_id: string }
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
    const checkStatusFollow = () => {
        return getFollow?.data.some(item => {
            if (item.follower_id === profile?.user_id && item.following_id === user_id) {
                return true
            }
            return false
        })
    }

    const handleShowPopup = async () => {
        if (checkUser()) {
            if (showPopupUpdateMe.current) {
                showPopupUpdateMe.current.showPopup()
            }
        } else {
            try {
                await follow({
                    following_id: user_id as string,
                    follower_id: profile.user_id as string
                }).unwrap()

            } catch (error: unknown) {
                console.log(error)
            }
        }
    }
    const handleOptionAction = (action: { id: number, title: string }) => {
        setTitle(action.title)
        setOptionAction(action.id)
        navigate({
            pathname: '',
            search: createSearchParams(omit({
                ...queryList,
                title: action.title
            }, ['id_user', 'for_you', 'title_tweet'])).toString()
        })
    }

    const checkUser = () => {
        return profile.user_id === user_id
    }

    const handleNextPage = () => {
        setLimit(prev => {
            const nextLimit = prev + 3
            navigate({
                pathname: '',
                search: createSearchParams(omit({
                    ...queryList,
                    limit: String(nextLimit)
                }, ['id_user', 'for_you', 'title_tweet'])).toString()
            });
            return nextLimit;
        });
    }
    return <div className="w-full">
        <PopupUpdateMe ref={showPopupUpdateMe} dataMe={getMe as GetUserResponse} />
        <div className="w-full">
            {
                isLoading ? <div className="flex w-full h-full items-center justify-center m-auto">< Skeleton /></div> : <>
                    <div className=" w-[611px] flex items-center h-[60px] sticky top-[0px] bg-white z-10">
                        <Link to={PAGE.HOME} className="!text-black cursor-pointer ml-[10px]">
                            <Icons.FaArrowLeftLong />
                        </Link>
                        <div className="ml-[20px] mt-[10px] ">
                            <h2 className="text-[20px] font-fontFamily ">{getMe?.data[0].name}</h2>
                            <p className="text-[15px] font-fontFamily text-black2">{`${getMe?.data[0].count_tweet} ${t('home.posts')}`}</p>
                        </div>
                    </div>
                    <div className="w-full relative z-[-1]">
                        {
                            Boolean(getMe?.data[0].cover_photo as string) ? <img src={getMe?.data[0].cover_photo} alt="cover_photo" className="w-full h-[200px] mt-[20px] object-cover" /> : <div className="w-full h-[200px] mt-[20px] bg-[#CFD9DE] z-0 " />
                        }
                        <img src={Boolean(getMe?.data[0].avatar as string) ? getMe?.data[0].avatar : DEFAULT_IMAGE_AVATAR} alt="avatar" className="w-[100px] h-[100px] absolute object-cover rounded-[50%] border-[1px] border-solid border-white left-0 bottom-[-50px] ml-[20px] " />
                    </div>
                    <div className=" flex justify-end ">
                        {
                            !checkUser() && <Button className={cn("!text-[16px] mr-[10px]  !font-[700] font-fontFamily bg-transparent   !border-[2px] !border-solid !border-black1 !w-[150px] !h-[40px] !rounded-[50px] cursor-pointer mt-[10px] ", {
                                'bg-black hover:opacity-70 text-white': !checkUser(),
                                '!text-black2 hover:bg-[#F7F9F9]': checkUser()
                            })} onClick={() => navigate(`/message/${user_id}`)}>{t('sidebarLeft.message')}</Button>
                        }
                        <Button className={cn("!text-[16px] mr-[10px]  !font-[700] font-fontFamily bg-transparent   !border-[2px] !border-solid !border-black1 !w-[150px] !h-[40px] !rounded-[50px] cursor-pointer mt-[10px] ", {
                            'bg-black hover:opacity-70 text-white': !checkUser(),
                            '!text-black2 hover:bg-[#F7F9F9]': checkUser()
                        })} onClick={handleShowPopup}>{checkUser() ? t('home.editProfile') : checkStatusFollow() ? t('sideBarRight.following') : t('sideBarRight.follow')}</Button>
                    </div>
                    <div className="mt-[20px] ml-[10px]">
                        <h2 className="text-[20px] font-fontFamily ">{getMe?.data[0].name}</h2>
                        <p className="text-[15px] font-fontFamily text-black2">@{getMe?.data[0].username}</p>
                        <p className="text-[15px] font-fontFamily text-black2 mt-[15px]">{getMe?.data[0].bio}</p>
                        <div className="flex items-center mt-[15px]">
                            <div className="flex items-center">
                                <Icons.FiMapPin size={17} />
                                <p className="text-[16px]  text-black3 font-fontFamily ml-[5px] mr-[20px]">{Boolean(getMe?.data[0].location) ? getMe?.data[0].location : 'Việt Nam'}</p>
                            </div>
                            <div className="flex items-center">
                                <Icons.CgWebsite size={17} />
                                <p className="text-[16px] font-fontFamily ml-[5px] mr-[20px] text-black3">{getMe?.data[0].website ?? ''}</p>
                            </div>
                        </div>

                        <div className="flex items-center mt-[15px]">
                            <div className="flex items-center">
                                <p className="text-[15px] font-[700] font-fontFamily ml-[5px]  ">{getMe?.data[0].count_following}</p>
                                <p className="text-[15px] font-fontFamily ml-[5px] mr-[20px] text-black3">{t('sideBarRight.following')}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-[15px] font-[700] font-fontFamily ml-[5px]  ">{getMe?.data[0].count_follower}</p>
                                <p className="text-[15px] font-fontFamily ml-[5px] mr-[20px] text-black3" >{t('sideBarRight.follow')}</p>
                            </div>
                        </div>

                    </div>
                </>
            }
            <div className="w-full flex items-center justify-between h-[40px] mt-[50px] mb-[20px] z-1">
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
                                    <Button onClick={handleNextPage} className="w-[200px] font-fontFamily font-[600] !text-[20px] bg-[#1B90DF] text-white cursor-pointer hover:opacity-80">{t('home.loading')}...</Button>
                                </div>)
                            }
                        </>
                    }
                </> : <div className="w-full items-center flex justify-center mt-[100px] text-[20px] text-black font-[600] font-fontFamily">{t('home.notPost')}</div>
            }
        </div>
    </div >
}
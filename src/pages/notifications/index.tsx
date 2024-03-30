/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { t } from 'i18next'

import { getProfileToLS } from "../../helps";
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default";
import { PAGE } from "../../constants";
import { checkStatusNotification } from "../../helps/check-status-notification";
import { NotificationType } from "../../components/post";
import { useGetNotificationQuery } from "../../apis/notification";
import { skipToken } from "@reduxjs/toolkit/query";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";

const Notifications = () => {
  const [limit, setLimit] = useState<number>(10)
  const { user_id } = useParams()

  const { data: getNotifications, isLoading } = useGetNotificationQuery(user_id ? {
    user_id: user_id as string,
    limit: limit,
    page: 1
  } : skipToken)

  const profile = getProfileToLS() as { username?: string, user_id?: string }
  const navigate = useNavigate()

  const handleNavigatePostDetail = (notification: NotificationType) => {
    if (notification?.status === 'follow') {
      navigate(generatePath(PAGE.PERSONAL, { user_id: notification?.sender_id as string }))
    } else {
      navigate(generatePath(PAGE.TWEET_DETAIL, { tweet_id: notification?.tweet_id as string }))
    }
  }

  const handleNextPage = () => {
    setLimit(prev => prev + 10)
  }


  return (
    <div className="w-full ">
      <div className="min-w-[611px]  fixed  flex items-center  bg-white border-b-[1px] h-[55px]  justify-between  top-0 border-solid border-white1 border-t-transparent border-l-transparent border-r-transparent">
        <div>
          <div className="h-full text-[18px]  cursor-pointer font-[700] font-fontFamily hover:bg-white1 ">
            <h3>{t('home.notifications')}</h3>
            <h5 className="text-[#536471] text-[13px] leading-3">@{profile.username}</h5>
          </div>
        </div>
      </div>
      <div className="mt-[55px]">

        {
          isLoading ? <div className="mt-[100px]"><Skeleton /></div> : getNotifications?.data.length > 0 ? getNotifications?.data.map((notification, index) => {
            return <div onClick={() => handleNavigatePostDetail(notification)} className="w-full flex items-center text-black cursor-pointer hover:bg-[#efecec] py-[15px] px-[5px] border-b-[1px] border-solid border-b-[#d7cccc] border-t-transparent border-r-transparent border-l-transparent" key={index}>
              <div className="mr-[15px] text-[#1D9BF0] ">
                <CiUser size={35} />
              </div>
              <div>
                <img src={notification.avatar ? notification.avatar : DEFAULT_IMAGE_AVATAR} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-[50%]" />
                <div className="flex items-center">
                  <h3 className="text-[15px] font-fontFamily font-[600] mr-[7px]">{notification.username}</h3>
                  <p className="text-[16px] font-fontFamily ">{checkStatusNotification(notification.status)}</p>
                </div>
              </div>
            </div>
          }) : <div className="mt-[150px] font-fontFamily text-[20px] font-[600] flex items-center w-full  justify-center">{t('home.notNotification')}</div>
        }
        {
          getNotifications !== undefined && Number(limit) < Number(getNotifications?.total_records) && (<div className="w-full justify-center flex items-center my-[50px]">
            <Button onClick={handleNextPage} className="w-[200px] font-fontFamily font-[600] !text-[20px] bg-[#1B90DF] text-white cursor-pointer hover:opacity-80">{t('home.loading')}...</Button>
          </div>)
        }
      </div>
    </div>
  )
}
export default Notifications;

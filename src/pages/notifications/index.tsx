/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";
import { useNavigate, generatePath, useParams } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import {t} from 'i18next'

import { getProfileToLS } from "../../helps";
import { ContextAPI } from "../../hooks";
// import { Skeleton } from "../../components/ui/skeleton";
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default";
import { PAGE } from "../../constants";
import { checkStatusNotification } from "../../helps/check-status-notification";
import { NotificationType } from "../../components/post";
import { useGetNotificationQuery } from "../../apis/notification";
import { skipToken } from "@reduxjs/toolkit/query";
import { Skeleton } from "../../components/ui/skeleton";

const Notifications = () => {
  const { listNotification, setListNotification } = useContext(ContextAPI)
  const { user_id } = useParams()
  const { data: getNotifications, isLoading } = useGetNotificationQuery(user_id ? {
    user_id: user_id as string,
    limit: 10,
    page: 1
  } : skipToken)
  const profile = getProfileToLS() as { username?: string, user_id?: string }
  const navigate = useNavigate()

  const handleNavigatePostDetail = (notification: NotificationType) => {
    if (notification?.status === 'like') {
      navigate(generatePath(PAGE.TWEET_DETAIL, { tweet_id: notification?.tweet_id as string }))
    } else {
      navigate(generatePath(PAGE.PERSONAL, { user_id: notification?.from as string }))
    }
  }
  useEffect(() => {
      setListNotification(getNotifications?.data ? getNotifications?.data as NotificationType[] : [])
  }, [getNotifications])
  return (
    <div className="w-full ">
      <div className="min-w-[611px]  fixed z-[999] flex items-center  bg-white border-b-[1px] h-[55px]  justify-between  top-0 border-solid border-white1 border-t-transparent border-l-transparent border-r-transparent">
        <div>
          <div className="h-full text-[18px]  cursor-pointer font-[700] font-fontFamily hover:bg-white1 ">
            <h3>Notifications</h3>
            <h5 className="text-[#536471] text-[13px] leading-3">@{profile.username}</h5>
          </div>
        </div>
      </div>
      <div className="mt-[55px]">

        {
          isLoading ? <div className="mt-[100px]"><Skeleton /></div> : listNotification.length > 0 ? listNotification.map((notification, index) => {
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
      </div>
    </div>
  )
}
export default Notifications;

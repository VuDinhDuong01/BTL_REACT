

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";


import { getProfileToLS } from "../../helps";
import { ContextAPI } from "../../hooks";
import { Skeleton } from "../../components/ui/skeleton";
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default";


const Notifications = () => {
  const { listNotification } = useContext(ContextAPI)
  const profile = getProfileToLS() as { username?: string, user_id?: string }
  const navigate = useNavigate()
  const checkStatusNotification = (status: string) => {
    switch (status) {
      case 'like':
        return "Đã yêu thích bài viết của bạn"
      case 'follow':
        return 'đã follow bạn'
      case 'commnet':
        return 'dã bình luận bài viết của bạn'
      case 'repliesComment':
        return 'đã phản hồi bình luận của bạn'
      default:
        break;
    }
  }
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
      {
        listNotification.length > 0 ? listNotification.map((notification, index) => {
          return <div className="w-full flex items-center text-black mt-[55px] cursor-pointer hover:bg-[#efecec] py-[15px] px-[5px]" key={index}>
            <div className="mr-[15px]">
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
        }) : <div className="mt-[150px] font-fontFamily text-[20px] font-[600] flex items-center w-full  justify-center">Bạn không có thông báo nào!</div>
      }

    </div>
  )
}

export default Notifications;

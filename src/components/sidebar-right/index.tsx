import { useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { t } from "i18next";

import { useFollowMutation, useGetFollowQuery, useGetUserQuery } from "../../apis/follow"
import { Button } from "../ui/button"
import { getProfileToLS } from "../../helps"
import { Skeleton } from "../ui/skeleton"
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default"
import { Search } from "../search"
import { ContextAPI } from "../../hooks";
import { Loading } from "../../assets/icons/eye";

export const SidebarRight = () => {
  const navigate = useNavigate()
  const [disable, setDisable] = useState<boolean>(false)
  const { data: getUser, isLoading } = useGetUserQuery()
  console.log(getUser)
  const [idUserFollow, setIdUserFollow]= useState<string>('')
  const { data: getFollow } = useGetFollowQuery()
  const [follow, { isLoading: loadingFollow }] = useFollowMutation()
  const { socket } = useContext(ContextAPI)
  const profile = getProfileToLS() as { user_id?: string, username?: string, avatar?: string }
  const getListUser = useMemo(() => {
    return getUser?.data.filter(user => {
      if(user._id === profile?.user_id ||  user?.roles[0] === 'admin'){
        return false
      }
      return true
    })
  }, [getUser?.data, profile?.user_id])

  
  // check
  const checkStatusFollow = (following_id: string) => {
    return getFollow?.data.some(item => {
      if (item.follower_id === profile?.user_id && item.following_id === following_id) {
        return true
      }
      return false
    })
  }
  useEffect(() => {
    loadingFollow ? setDisable(true) : setDisable(false)
  }, [loadingFollow])


  const handleFollowUser = async (following_id: string) => {
    setIdUserFollow(following_id)
    try {
      socket?.emit("follow_user", {
        to: following_id,
        from: profile?.user_id,
        status: 'follow',
        username: profile?.username,
        avatar: profile?.avatar,
      })
      await follow({
        following_id,
        follower_id: profile.user_id as string
      }).unwrap()
    } catch (error: unknown) {
      console.log(error)
    }
  }
  return (
    <div className="w-full min-h-[100vh]  ml-[15px] ">
      <Search />
      <div className="w-full rounded-[16px] bg-[#f7f9f9] mt-[70px] ">
        <h2 className="text-[#0f1419] font-[800] font-fontFamily mb-[20px] pt-[20px] px-[10px]">{t('sideBarRight.peopleFriendsWith')}</h2>
        {
          isLoading ? <div className="mt-[400px]"><Skeleton /></div> : <>
            {
              getListUser?.map(user => {
                return <div className="py-[10px] flex  justify-between items-center  px-[10px]" key={user._id}>
                  <div className="flex items-center">
                    <img src={user.avatar ? user.avatar : DEFAULT_IMAGE_AVATAR} alt='avatar' className="w-[50px] h-[50px] object-cover rounded-[50%] mr-[10px]" />
                    <div>
                      <h3 className="text-[15px] font-fontFamily cursor-pointer font-[700] text-[#0f1419] my-[3px] hover:underline" onClick={() => navigate(`/personal/${user._id}`)}>{user.name ?? ''}</h3>
                      <p className="text-[13px] text-[#536471] font-fontFamily">@{user.username ?? ''}</p>
                    </div>
                  </div>
                  <Button disabled={disable &&  user._id === idUserFollow } className={`w-[150px] text-[15px] !font-[600] bg-black text-white flex  items-center justify-center   hover:opacity-70 ${disable   ?  'cursor-not-allowed':'cursor-pointer'} `
                } onClick={() => handleFollowUser(user._id)}>{loadingFollow && user._id === idUserFollow ? <Loading /> : checkStatusFollow(user._id) ? t('sideBarRight.following') : t('sideBarRight.follow')}</Button>
                </div>
              })
            }
          </>
        }
      </div>
    </div>
  )
}

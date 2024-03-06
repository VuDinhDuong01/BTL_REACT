import { useMemo } from "react"
import { useNavigate} from "react-router-dom"

import { useFollowMutation, useGetFollowQuery, useGetUserQuery } from "../../apis/follow"
// import { Search } from "../search"
import { Button } from "../ui/button"
import { getProfileToLS } from "../../helps"
import { Skeleton } from "../ui/skeleton"
import { cn } from "../../helps/cn"
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default"
import { Search } from "../search"



export const SidebarRight = () => {
  const navigate= useNavigate()
  const { data: getUser, isLoading } = useGetUserQuery()
  const { data: getFollow } = useGetFollowQuery()
  const [follow] = useFollowMutation()

  const profile = getProfileToLS() as { user_id?: string }
  const getListUser = useMemo(() => {
    return getUser?.data.filter(user => user._id !== profile?.user_id)
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

  const handleFollowUser = async (following_id: string) => {
    try {
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
     
      <div className="w-full rounded-[16px] bg-[#f7f9f9] mt-[70px] relative">
        <h2 className="text-[#0f1419] font-[800] font-fontFamily mb-[20px] pt-[20px] px-[10px]">People you can Make friends with</h2>
        {
          isLoading ? <div className="mt-[400px]"><Skeleton /></div> : <>
            {
              getListUser?.map(user => {
                return <div className="py-[10px] flex  justify-between items-center  px-[10px]" key={user._id}>
                  <div className="flex items-center">
                    <img src={user.avatar ? user.avatar : DEFAULT_IMAGE_AVATAR} alt='avatar' className="w-[50px] h-[50px] object-cover rounded-[50%] mr-[10px]" />
                    <div>
                        <h3 className="text-[15px] font-fontFamily cursor-pointer font-[700] text-[#0f1419] my-[3px] hover:underline" onClick={()=>navigate(`/personal/${user._id}`)}>{user.name ?? ''}</h3>
                      <p className="text-[13px] text-[#536471] font-fontFamily">@{user.username ?? ''}</p>
                    </div>
                  </div>
                  <Button className={cn("w-[150px] text-[15px] !font-[600] bg-black text-white flex items-center justify-center !cursor-pointer hover:opacity-70 ", {
                  })}  onClick={() => handleFollowUser(user._id)}>{checkStatusFollow(user._id) ? 'Following' : 'Follow'}</Button>
                </div>
              })
            }
          </>
        }
      </div>
    </div>
  )
}

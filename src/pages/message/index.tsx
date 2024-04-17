import { useContext, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { useGetUserQuery } from "../../apis/follow"
import { Skeleton } from "../../components/ui/skeleton"
import { DEFAULT_IMAGE_AVATAR } from "../../helps/image-user-default"

import { getProfileToLS } from "../../helps"
import { Button } from "../../components/ui/button"
import { cn } from "../../helps/cn"
import { ContextAPI } from "../../hooks"


export const Message = () => {
    const { socket } = useContext(ContextAPI)
    const navigate = useNavigate()
    const { data: getUser, isLoading } = useGetUserQuery()
    const profile = getProfileToLS() as { user_id: string }
    const getListUser = useMemo(() => {
        return getUser?.data.filter(user => user._id !== profile?.user_id)
    }, [getUser?.data, profile?.user_id])

    const handleChatMessage = (receiver_id: string) => {
        socket?.emit("check_user_active", {
            from: profile.user_id,
            to: receiver_id
        })
        navigate(`/message/${receiver_id}`)
    }

    return (
        <div className="w-full  px-[20px]">
            <h3 className="text-[20px] font-[600] font-fontFamily mt-[50px]">Messages</h3>
            <div className="w-full flex items-center justify-center mt-[50px]">
                <h1 className="w-full text-[30px] font-fontFamily font-[700]">Welcome to your inbox!</h1>

            </div>
            <p className="text-[14px] font-fontFamily mt-[10px] mb-[40px]">Drop a line, share posts and more with private conversations between you and others on X. </p>
            {
                isLoading ? <div className="mt-[150px]"><Skeleton /></div> : <>
                    {
                        getListUser?.map(user => {
                            return <div className="py-[10px] flex  justify-between items-center  px-[10px]" key={user._id}>
                                <div className="flex items-center">
                                    <img src={user.avatar ? user.avatar : DEFAULT_IMAGE_AVATAR} alt='avatar' className="w-[50px] h-[50px] object-cover rounded-[50%] mr-[10px]" />
                                    <div>
                                        <h3 className="text-[15px] font-fontFamily cursor-pointer font-[700] text-[#0f1419] my-[3px]" >{user.name ?? ''}</h3>
                                        <p className="text-[13px] text-[#536471] font-fontFamily">@{user.username ?? ''}</p>
                                    </div>
                                </div>
                                <Button className={cn(" !rounded-2xl text-[15px] !font-[600] bg-[#1B90DF] text-white flex items-center justify-center !cursor-pointer hover:opacity-70 ", {
                                })} onClick={() => handleChatMessage(user._id)} >Tin nhắn</Button>
                            </div>
                        })
                    }
                </>
            }
        </div>
    )
}

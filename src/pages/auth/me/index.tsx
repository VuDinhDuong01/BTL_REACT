/* eslint-disable no-extra-boolean-cast */
import { useRef } from "react"

import { Button } from "../../../components/ui/button"
import { Icons } from "../../../helps/icons"
import { Link } from "react-router-dom"
import { PAGE } from "../../../contants"
import { PopupUpdateMe, ShowPopupHandle } from "../../../components/ui/dialog-form-update-me"
import { useGetMeQuery } from "../../../apis"
import { DEFAULT_IMAGE_AVATAR } from "../../../helps/image-user-default"
import { GetUserResponse } from "../../../types/user"
import { Skeleton } from "../../../components/ui/skeleton"

export const Personal = () => {

    const { data: getMe, isLoading } = useGetMeQuery(null)
    const showPopupUpdateMe = useRef<ShowPopupHandle>(null)

    const handleShowPopup = () => {
        if (showPopupUpdateMe.current) {
            showPopupUpdateMe.current.showPopup()
        }
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
        </div>
    </div>
}
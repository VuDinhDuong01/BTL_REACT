import { useState } from "react"

import { Button } from "../../../components/ui/Button"
import { Icons } from "../../../helps/icons"

export const Personal = () => {
    return <div className="w-full">
        <div className="w-full flex items-center">
            <Icons.FaArrowLeftLong />
            <div className="ml-[20px] mt-[10px]">
                <h2 className="text-[20px] font-fontFamily ">Dương Lò Vôi</h2>
                <p className="text-[15px] font-fontFamily text-[#536471]">4 posts</p>
            </div>

        </div>
        <div className="w-full relative ">
            <div className="w-full h-[200px] mt-[20px] bg-[#CFD9DE]" />
            <img src="https://pbs.twimg.com/profile_images/1683022544243404801/QBz2K1uB_400x400.png" alt="avatar" className="w-[100px] h-[100px] absolute object-cover rounded-[50%] left-0 bottom-[-50px] ml-[20px]" />
        </div>
        <div className="w-full flex justify-end ">
            <Button className="!text-[16px] mr-[10px] !text-[#536471] !font-[700] font-fontFamily bg-transparent   !border-[2px] !border-solid  !border-[#8E99A1] !w-[150px] !h-[40px] !rounded-[50px] cursor-pointer mt-[10px] ">Edit profile</Button>
        </div>
        <div className="mt-[20px] ml-[10px]">
            <h2 className="text-[20px] font-fontFamily ">Dương Lò Vôi</h2>
            <p className="text-[15px] font-fontFamily text-[#536471]">@ngocduong</p>
            <p className="text-[15px] font-fontFamily text-[#536471] mt-[15px]">xin chào</p>
            <div className="flex items-center mt-[15px]">
                <div className="flex items-center">
                    <Icons.FiMapPin size={17} />
                    <p className="text-[16px]  text-[#8E99A1] font-fontFamily ml-[5px] mr-[20px]">Việt Nam</p>
                </div>
                <div className="flex items-center">
                    <Icons.CiCalendarDate size={17} />
                    <p className="text-[16px] font-fontFamily ml-[5px] mr-[20px] text-[#8E99A1]">Việt Nam</p>
                </div>
            </div>
            <div className="flex items-center mt-[15px]">
                <div className="flex items-center">
                    <p className="text-[15px] font-[700] font-fontFamily ml-[5px]  ">3</p>
                    <p className="text-[15px] font-fontFamily ml-[5px] mr-[20px] text-[#8E99A1]">Following</p>
                </div>
                <div className="flex items-center">
                    <p className="text-[15px] font-[700] font-fontFamily ml-[5px]  ">3</p>
                    <p className="text-[15px] font-fontFamily ml-[5px] mr-[20px] text-[#8E99A1]" >Followers</p>
                </div>
            </div>

        </div>
    </div>
}
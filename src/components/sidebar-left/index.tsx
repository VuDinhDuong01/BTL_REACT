import { NavLink } from "react-router-dom"
import { CommunicationIcon, HomeIcon, Logo, MessageIcon } from "../../assets/icons/eye"
import { BellIcon, UserIcon } from "lucide-react"
import { Images } from "../../assets/images"
import { Button } from "../ui/Button"
import { PAGE } from "../../contants"



export const SidebarLeft = () => {
  return (
    <div className="w-full" >
      <div className="w-[50px] cursor-pointer h-[50px] p-[10px] hover:bg-white1 rounded-[50%] flex items-center justify-center">
        <Logo />
      </div>
      <div>
        <NavLink to={PAGE.HOME} className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}  >
          <div className="ml-[10px]">
            <HomeIcon />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] ">Home</p>
        </NavLink>
        <NavLink to={PAGE.NOTIFICATIONS} className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <BellIcon className="text-black" />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">Notifications</p>
        </NavLink>
        <NavLink to='/f' className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <CommunicationIcon />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">Communities</p>
        </NavLink>
        <NavLink to={PAGE.PERSONAL} className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <UserIcon className="text-black" />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">Profile</p>
        </NavLink>
        <NavLink to='/h' className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <MessageIcon />
          </div>
          <p className="text-[20px] font-fontFamily ml-[30px] !text-black">Messages</p>
        </NavLink>
        <Button className="bg-[#1B90DF]  w-full cursor-pointer text-white py-[15px] rounded-[50px] font-fontFamily font-[700] !text-[18px] mt-[20px] ">Post</Button>
      </div>
      <div className="flex items-center cursor-pointer fixed bottom-[10px]  w-[250px] py-[10px] hover:bg-white1 hover:rounded-[50px]" >
        <img src={Images.logo} alt="user" className="w-[40px] ml-[10px] h-[40px] object-cover rounded-[50%]" />
        <div className="ml-[10px] ">
          <h3 className="text-[14px] font-fontFamily">NGỌC DƯƠNG</h3>
          <p className="font-fontFamily text-[12px] mt-[5px]">duong09</p>
        </div>
      </div>
    </div>
  )
}

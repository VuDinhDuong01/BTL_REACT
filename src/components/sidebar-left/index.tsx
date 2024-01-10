import { NavLink, useNavigate } from "react-router-dom"
import { useState , useRef} from "react";
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from "react-i18next";

import { CommunicationIcon, HomeIcon, Logo, MessageIcon, MoreIcon } from "../../assets/icons/eye"
import { BellIcon, UserIcon } from "lucide-react"
import { Images } from "../../assets/images"
import { Button } from "../ui/Button"
import { PAGE } from "../../contants"
import { useLogoutMutation } from "../../apis";
import { getRefreshTokenToLS } from "../../helps";
import { ToastMessage } from "../../helps/toast-message";
import { ChangePassowrd, ChangePasswordResponse } from "../ui/dialog-change-password";

export const SidebarLeft = () => {
  const showChangePasswordRef=useRef<ChangePasswordResponse>(null)
  const [toggleLogout, setToggleLogout] = useState<boolean>(false)
  const [isShowTippy, setIsShowTippy] = useState<boolean>(false)
  const navigate = useNavigate()
  const refresh_token = getRefreshTokenToLS() as string
  const [logout] = useLogoutMutation()
  const { t } = useTranslation()
  const handleLogout = async () => {
    try {
      await logout({ refresh_token }).unwrap()
      navigate(PAGE.LOGIN)
      ToastMessage({ status: 'success', message: t('logout.logoutSuccess') })
      setToggleLogout(!toggleLogout)

    } catch (error: unknown) {
      console.log(error)
    }
  }
  const handleClickShowPopupChangePassword=()=>{
    if(showChangePasswordRef.current){
       showChangePasswordRef.current.showPopupChangePassword()
    }
  }
  return (
    <div className="w-full" >
      <ChangePassowrd  ref={showChangePasswordRef} />
      <div className="w-[50px] cursor-pointer h-[50px] p-[10px] hover:bg-white1 rounded-[50%] flex items-center justify-center">
        <Logo />
      </div>
      <div>
        <NavLink to={PAGE.HOME} className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:w-[80%] hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex hover:w-[80%] items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}  >
          <div className="ml-[10px]">
            <HomeIcon />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px]  !text-black">Home</p>
        </NavLink>
        <NavLink to={PAGE.NOTIFICATIONS} className={({ isActive }) => isActive ? "flex items-center no-underline hover:w-[80%] hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "hover:w-[80%] flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <BellIcon className="text-black" />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">Notifications</p>
        </NavLink>
        <NavLink to='/f' className={({ isActive }) => isActive ? "flex items-center no-underline hover:w-[80%] hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "hover:w-[80%] flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <CommunicationIcon />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">Communities</p>
        </NavLink>
        <NavLink to={PAGE.PERSONAL} className={({ isActive }) => isActive ? "hover:w-[80%] flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "hover:w-[80%] flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <UserIcon className="text-black" />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">Profile</p>
        </NavLink>
        <NavLink to='/h' className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:w-[80%] hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex items-center hover:w-[80%] no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <MessageIcon />
          </div>
          <p className="text-[20px] font-fontFamily ml-[30px] !text-black">Messages</p>
        </NavLink>
        <Tippy
          hideOnClick={isShowTippy}
          trigger='click'
          interactive
          render={attrs => (
            <div>
              {
                isShowTippy && <div onClick={() => setIsShowTippy(!isShowTippy)} style={{ boxShadow: '0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)' }} className="bg-white ml-[10px] !cursor-pointer min-w-[250px]   rounded-[10px]  text-black font-fontFamily text-[15px] font-[700]   shadow-md"  {...attrs}>
                  <div onClick={handleClickShowPopupChangePassword} className="py-[15px]   w-full hover:bg-black3 hover:rounded-t-[10px] hover:text-white">
                    <p className="ml-[10px]">Change password</p>
                  </div>
                  <div className="py-[15px]   w-full hover:bg-black3 hover:rounded-b-[10px] hover:text-white">
                    <p className="ml-[10px]">Professional Tools</p>
                  </div>

                </div>
              }
            </div>
          )}
        >
          <div className='flex items-center cursor-pointer  hover:w-[80%] py-[10px] hover:bg-white1 hover:rounded-[50px] mt-[15px]' onClick={() => setIsShowTippy(true)}>
            <div className="ml-[10px]">
              <MoreIcon />
            </div>
            <p className="text-[20px] font-fontFamily ml-[30px] !text-black">More</p>
          </div>
        </Tippy>
        <Button className="bg-[#1B90DF]  w-[80%] cursor-pointer text-white py-[20px] rounded-[100px] font-fontFamily font-[700] !text-[18px] mt-[20px] hover:opacity-[80%]">Post</Button>
      </div>
      <Tippy
        hideOnClick={toggleLogout}
        trigger='click'
        interactive
        render={attrs => (
          <div>
            {
              toggleLogout && <div onClick={handleLogout} className="bg-white !cursor-pointer p-[20px]  rounded-[50px] text-black font-fontFamily text-[15px] font-[700] border-[2px] border-solid border-black3 shadow-sm"  {...attrs}>
                Log out @Ngocduong00
              </div>
            }
          </div>
        )}
      >
        <div className="flex items-center cursor-pointer fixed bottom-[10px]  w-[250px] py-[10px] hover:bg-white1 hover:rounded-[50px]" onClick={() => setToggleLogout(true)} >
          <img src={Images.logo} alt="user" className="w-[40px] ml-[10px] h-[40px] object-cover rounded-[50%]" />
          <div className="ml-[10px] ">
            <h3 className="text-[14px] font-fontFamily">NGỌC DƯƠNG</h3>
            <p className="font-fontFamily text-[12px] mt-[5px]">duong09</p>
          </div>
        </div>
      </Tippy>

    </div>
  )
}

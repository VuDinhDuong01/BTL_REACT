/* eslint-disable no-extra-boolean-cast */
import { NavLink, useNavigate } from "react-router-dom"
import { useState, useRef, useContext, useEffect } from "react";
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from "react-i18next";

import { BookMarkIcon, CommunicationIcon, HomeIcon, Logo, MessageIcon, MoreIcon } from "../../assets/icons/eye"
import { BellIcon, UserIcon } from "lucide-react"
import { Images } from "../../assets/images"
import { Button } from "../ui/button"
import { PAGE } from "../../constants"
import { useGetMeQuery, useLogoutMutation } from "../../apis";
import { getProfileToLS, getRefreshTokenToLS, removeLS } from "../../helps";
import { ToastMessage } from "../../helps/toast-message";
import { ChangePassword, ChangePasswordResponse } from "../ui/dialog-change-password";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { ContextAPI } from "../../hooks";
import { skipToken } from "@reduxjs/toolkit/query";
import { NotificationType } from "../post";

export const SidebarLeft = () => {
  const showChangePasswordRef = useRef<ChangePasswordResponse>(null)
  const refFormChangePassword = useRef<HTMLFormElement>(null)
  const [toggleLogout, setToggleLogout] = useState<boolean>(false)

  const [isShowTippy, setIsShowTippy] = useState<boolean>(false)
  const navigate = useNavigate()
  const profile = getProfileToLS() as { user_id: string }
  const refresh_token = getRefreshTokenToLS() as string
  const [logout] = useLogoutMutation()
  const { data: getMe } = useGetMeQuery(profile?.user_id ? {
    user_id: profile?.user_id
  } : skipToken)
  const { listNotification } = useContext(ContextAPI)
  const { t } = useTranslation()
  const [copyListNotification, setCopyListNotification] = useState<NotificationType[]>([])
  const handleLogout = async () => {
    try {
      await logout({ refresh_token }).unwrap()
      navigate(PAGE.LOGIN)
      ToastMessage({ status: 'success', message: t('logout.logoutSuccess') })
      setToggleLogout(!toggleLogout)
      removeLS()
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const handleClickShowPopupChangePassword = () => {
    if (showChangePasswordRef.current) {
      showChangePasswordRef.current.showPopupChangePassword()
    }
  }
  useEffect(() => {
    if (listNotification?.length > 0) {
      setCopyListNotification(listNotification)
    }
  }, [listNotification])

  useClickOutSide({
    onClickOutSide: () => {
      showChangePasswordRef.current && showChangePasswordRef.current.hiddenPopupChangePassword()
    }, ref: refFormChangePassword
  })

  const handleEmptyListNotification = () => {
    setCopyListNotification([])
  }

  return (
    <div className="w-full  min-h-[100vh] z-[9990]" >
      <ChangePassword ref={showChangePasswordRef} refFormChangePassword={refFormChangePassword} />

      <div className="w-[50px] cursor-pointer h-[50px] p-[10px] hover:bg-white1 rounded-[50%] flex items-center justify-center" onClick={() => navigate(PAGE.HOME)}>
        <Logo />
      </div>
      <div>
        <NavLink to={PAGE.HOME} className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:w-[80%] hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex hover:w-[80%] items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}  >
          <div className="ml-[10px]">
            <HomeIcon />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px]  !text-black">{t('sidebarLeft.home')}</p>
        </NavLink>
        <NavLink to={`/personal/${profile?.user_id}`} className={({ isActive }) => isActive ? "hover:w-[80%] flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "hover:w-[80%] flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <UserIcon className="text-black" />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">{t('sidebarLeft.profile')}</p>
        </NavLink>
        <NavLink to='/message' className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:w-[80%] hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex items-center hover:w-[80%] no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <MessageIcon />
          </div>
          <p className="text-[20px] font-fontFamily ml-[30px] !text-black">{t('sidebarLeft.message')}</p>
        </NavLink>
        <NavLink to={`/bookmark/${profile?.user_id}`} className={({ isActive }) => isActive ? "flex items-center no-underline hover:bg-white1 hover:w-[80%] hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "flex items-center hover:w-[80%] no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <BookMarkIcon />
          </div>
          <p className="text-[20px] font-fontFamily ml-[30px] !text-black">{t('sidebarLeft.bookmark')}</p>
        </NavLink>
        <NavLink to={`/notifications/${profile?.user_id}`} onClick={handleEmptyListNotification} className={({ isActive }) => isActive ? "flex items-center no-underline hover:w-[80%]  hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "hover:w-[80%] flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <>
            <div className="ml-[10px] relative">
              <BellIcon className="text-black" />
              {
                copyListNotification.length > 0 && <div className="px-[8px] py-[3px] bg-[red] text-white rounded-[50%] text-[14px] font-[600] font-fontFamily absolute  bottom-[20px] right-[-10px]
              ">{copyListNotification.length}</div>
              }
            </div>
            <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">{t('sidebarLeft.notifications')}</p>
          </>

        </NavLink>
        <NavLink to={PAGE.COMMUNITIES} className={({ isActive }) => isActive ? "flex items-center no-underline hover:w-[80%] hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] text-black font-[700]" : "hover:w-[80%] flex items-center no-underline hover:bg-white1 hover:rounded-[50px] py-[10px] mt-[10px] !text-black1"}>
          <div className="ml-[10px]">
            <CommunicationIcon />
          </div>
          <p className="text-[20px] font-fontFamily  ml-[30px] !text-black">{t('sidebarLeft.communities')}</p>
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
                    <p className="ml-[10px]">{t('changePassword.change_password')}</p>
                  </div>
                  <div className="py-[15px]   w-full hover:bg-black3 hover:rounded-b-[10px] hover:text-white">
                    <p className="ml-[10px]">{t('changePassword.professionalTools')}</p>
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
            <p className="text-[20px] font-fontFamily ml-[30px] !text-black">{t('sidebarLeft.more')}</p>
          </div>
        </Tippy>
        <Button className="bg-[#1B90DF]  w-[80%] cursor-pointer text-white py-[20px] rounded-[100px] font-fontFamily font-[700] !text-[18px] mt-[20px] hover:opacity-[80%]">{t('sidebarLeft.post')}</Button>
      </div>
      <Tippy
        hideOnClick={toggleLogout}
        trigger='click'
        interactive
        render={attrs => (
          <div>
            {
              toggleLogout && <div onClick={handleLogout} className="bg-white !cursor-pointer p-[20px]  rounded-[50px] text-black font-fontFamily text-[15px] font-[700] border-[2px] border-solid border-black3 shadow-sm"  {...attrs}>
                {t('sidebarLeft.logout')} {getMe?.data[0].name}
              </div>
            }
          </div>
        )}
      >
        <div className="flex items-center cursor-pointer fixed bottom-[10px] w-[250px] py-[10px] hover:bg-white1 hover:rounded-[50px]" onClick={() => setToggleLogout(true)} >
          <img src={Boolean(getMe?.data[0].avatar) ? getMe?.data[0].avatar : Images.logo} alt="avatar" className="w-[40px] ml-[10px] h-[40px] object-cover rounded-[50%]" />
          <div className="ml-[10px] ">
            <h3 className="text-[14px] font-fontFamily">{getMe?.data[0].name}</h3>
            <p className="font-fontFamily text-[12px] mt-[5px]">{getMe?.data[0].username}</p>
          </div>
        </div>
      </Tippy>
    </div>
  )
}

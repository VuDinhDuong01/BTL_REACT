
import { Link, useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useTranslation } from "react-i18next";

import { FaUserFriends } from "react-icons/fa";
import { SiPostman } from "react-icons/si";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiSolidLike } from "react-icons/bi";
import { PAGE } from '../../constants'
import { IoMdHome } from "react-icons/io";
import { Button } from '../ui/button'
import { Images } from '../../assets/images'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetMeQuery, useLogoutMutation } from '../../apis'
import { getProfileToLS, getRefreshTokenToLS, removeLS } from '../../helps'
import { ToastMessage } from '../../helps/toast-message'

export const SideBarAdmin = () => {

  const navigate = useNavigate()
  const profile = getProfileToLS() as { user_id: string }

  const { data: getMe } = useGetMeQuery(profile?.user_id ? {
    user_id: profile?.user_id
  } : skipToken)
  const { t } = useTranslation()
  const location = useLocation()

  const refresh_token = getRefreshTokenToLS() as string
  const [logout] = useLogoutMutation()
  const handleLogout = async () => {
    try {
      await logout({ refresh_token }).unwrap()
      navigate(PAGE.LOGIN)
      ToastMessage({ status: 'success', message: t('logout.logoutSuccess') })
      // setToggleLogout(!toggleLogout)
      removeLS()
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <div className='2xl:w-[270px] md:w-[190px]  bg-[#2A3444] fixed top-0 lef-0 bottom-0'>
      <div>
        <div className='2xl:w-full md:w-full h-[124px] shrink-0 bg-green1 flex items-center justify-center mb-[33px]'>
          <img
            src={Images.Logo}
            alt='logo'
            className='2xl:w-[187px] 2xl:h-[75px] md:w-[130px] md:h-[50px] object-cover flex items-center justify-center'
          />
        </div>
        <div className='px-[25px]'>

          { (
            <ul className='text-[white] list-none  font-fontFamily text-[15px] mb-[20px] animate-slideBottom '>
              <li
                className={clsx({
                  ['py-[15px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.ADMIN || location.pathname === PAGE.ADMIN
                })}
              >
                <Link to={PAGE.ADMIN} className='pl-[10px]  no-underline  text-white'>
                 <IoMdHome /> DASHBOARD
                </Link>
              </li>
              <li
                className={clsx({
                  ['py-[15px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.USER || location.pathname === PAGE.USER
                })}
              >
                <Link to={PAGE.USER} className='pl-[30px] text-white no-underline '>
                <FaUserFriends />  NGƯỜI DÙNG
                </Link>
              </li>
              <li
                className={clsx({
                  ['py-[15px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.POST || location.pathname === PAGE.POST
                })}
              >
                <Link to={PAGE.POST} className='pl-[30px] text-white no-underline'>
                 <SiPostman /> BÀI VIẾT
                </Link>
              </li>
              <li
                className={clsx({
                  ['py-[15px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.COMMENT || location.pathname === PAGE.COMMENT
                })}
              >
                <Link to={PAGE.COMMENT} className='pl-[30px] text-white no-underline'>
                <FaRegCommentDots />  BÌNH LUẬN
                </Link>
              </li>
               <li
                className={clsx({
                  ['py-[15px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.LIKE || location.pathname === PAGE.LIKE
                })}
              >
                <Link to={PAGE.LIKE} className='pl-[30px] text-white no-underline'>
                 <BiSolidLike />  YÊU THÍCH
                </Link>
              </li> 
            </ul>
          )}
        </div>
        <div className='2xl:ml-[15px] fixed 2xl:bottom-[15px] md:bottom-0 md:w-[180px] md:flex md:flex-col md:justify-center md:items-center 2xl:justify-start 2xl:items-start '>
          <div className='mb-[15px] flex items-center'>
            <img
              src={
                profile
                  ? 'https://tse4.mm.bing.net/th?id=OIP.jixXH_Els1MXBRmKFdMQPAHaHa&pid=Api&P=0&h=180'
                  : Images.Avatar
              }
              alt=''
              className='w-[40px] h-[40px] shrink-0 rounded-[40px] mr-[11px]'
            />
            <div>
              <h3 className='text-white font-fontFamily text-[16px] font-[600] '>{getMe?.data[0].name}</h3>
              <p className='text-[#939393] font-fontFamily text-[14px] font-[400] '>Admin</p>
            </div>
          </div>
          <Button
            className='2xl:w-[230px]  md:w-[100%] md:m-auto 2xl:m-0 h-[40px] shrink-0 rounded-[5px] bg-[#3F4D63] flex items-center cursor-pointer'
            onClick={handleLogout}
          >
            <img src={Images.Logout} alt='' className='w-[19px] h-[25px] shrink-0  mr-[11px] ml-[12px]' />
            <p className='text-white font-fontFamily text-[16px] leading-[40px]'>Log out</p>
          </Button>
        </div>
      </div>
    </div>
  )
}


import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from "react-i18next";


import { PAGE } from '../../constants' 

import { Button } from '../ui/button' 
import { Images } from '../../assets/images' 
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetMeQuery, useLogoutMutation } from '../../apis'
import { getProfileToLS, getRefreshTokenToLS, removeLS } from '../../helps'
import { ToastMessage } from '../../helps/toast-message'

export const SideBarAdmin = () => {

   const navigate = useNavigate()
  const profile = getProfileToLS() as { user_id: string }
  const [toggle, setToggle] = useState<boolean>(true)
  const { data: getMe } = useGetMeQuery(profile?.user_id ? {
    user_id: profile?.user_id
  } : skipToken)
  const { t } = useTranslation()
  const location = useLocation()
  const handleToggle = () => {
    setToggle((prev) => !prev)
  }
  localStorage.setItem('toggle', JSON.stringify(toggle))
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
  
  const toggleStorage = JSON.parse(localStorage.getItem('toggle') as string)
  return (
    <div className='2xl:w-[260px] md:w-[180px]  bg-[#2A3444] fixed top-0 lef-0 bottom-0'>
      <div>
        <div className='2xl:w-full md:w-full h-[124px] shrink-0 bg-green1 flex items-center justify-center mb-[33px]'>
          <img
            src={Images.Logo}
            alt='logo'
            className='2xl:w-[187px] 2xl:h-[75px] md:w-[130px] md:h-[50px] object-cover flex items-center justify-center'
          />
        </div>
        <div className='px-[25px]'>
          <div className='flex items-center justify-between  cursor-pointer py-[15px]' onClick={handleToggle}>
            <div className='flex items-center'>
              <img
                src={Images.Notepad}
                alt='img_notepad'
                className='w-[24px] h-[24px] shrink-0 object-cover mr-[10px]'
              />
              <p className='text-white font-fontFamily text-[20px] font-[600]'>Viết bài</p>
            </div>
            {toggleStorage ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-3 h-3 font-bold text-white'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            ) : (
              <img src={Images.Check} alt='img_check' />
            )}
          </div>
          {toggleStorage && (
            <ul className='text-[white] list-none  font-fontFamily text-[18px] mb-[20px] animate-slideBottom '>
              <li
                className={clsx({ 
                  ['py-[10px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.post || location.pathname === PAGE.addtopic
                })}
              >
                <Link to={PAGE.post} className='pl-[30px] text-white no-underline'>
                  Bài viết
                </Link>
              </li>
              <li
                className={clsx({
                  ['py-[10px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.topic || location.pathname === PAGE.addpost
                })}
              >
                <Link to={PAGE.topic} className='pl-[30px] text-white no-underline'>
                  Chủ đề
                </Link>
              </li>
              <li
                className={clsx({
                  ['py-[10px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.author || location.pathname === PAGE.addauthor
                })}
              >
                <Link to={PAGE.author} className='pl-[30px] text-white no-underline'>
                  Tác giả
                </Link>
              </li>
              <li
                className={clsx({
                  ['py-[10px]  rounded-[5px] ']: true,
                  ['bg-[#3F4D63]']: location.pathname === PAGE.tag || location.pathname === PAGE.addtag
                })}
              >
                <Link to={PAGE.tag} className='pl-[30px] text-white no-underline'>
                  Tag
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

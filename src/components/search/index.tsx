import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { t } from "i18next";

import { Icons } from "../../helps/icons"
import { useSearch } from '../../hooks/useSearch'
import { useGetSearchUserQuery } from '../../apis'
import { skipToken } from '@reduxjs/toolkit/query'
import { User } from '../../types/comment'
import { Skeleton } from '../ui/skeleton'
import { DEFAULT_IMAGE_AVATAR } from '../../helps/image-user-default'


export const Search = () => {
    const navigate = useNavigate()
    const [countCharSearch, setCountCharSearch] = useState<number>(0)
    const [valueSearch, setValueSearch] = useState<string>('')
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            search: ''
        }
    })

    const onSubmit = (handleSubmit(data => {
        console.log(data)
    }))
    const handleResetTextSearch = () => {
        reset({ search: '' })
        setCountCharSearch(0)
        setValueSearch('')
    }

    const { textSearch } = useSearch({ value: valueSearch, delay: 1000 })

    const { data: getSearchUser, isLoading } = useGetSearchUserQuery(textSearch !== '' ? {
        user_search: textSearch
    } : skipToken)

    const handleNavigateUser = (user_id: string) => {
        navigate(`/personal/${user_id}`)
        reset({ search: '' })
        setValueSearch('')
        setCountCharSearch(0)
    }

    return (
        <div className=''>
            <div className='w-full relative  z-[99]'>
                <div>
                    <form className="w-full fixed top-[0px] py-[5px] bg-[white]" onSubmit={onSubmit}>
                        <input
                            className="w-[370px] focus:outline-none relative  focus:border-[1px] focus:border-solid focus:border-green2 !rounded-[50px] pl-[40px] font-fontFamily !pr-[45px] text-[16px] h-[45px] bg-[#EFF3F4] outline-none border-none"
                            placeholder={t('sideBarRight.search')}
                            {...register('search', {
                                onChange: (e) => {

                                    setCountCharSearch(e.target.value.length)
                                    setValueSearch(e.target.value)
                                }
                            })}
                        />
                        <div className=" absolute top-[15px] left-[10px] text-[#EFF3F4]">
                            <Icons.IoIosSearch size={25} />
                        </div>
                        {
                            countCharSearch > 0 && <div className="w-[20px] h-[20px] bg-green2 rounded-[50%] text-white flex items-center justify-center cursor-pointer absolute top-[17px] left-[340px]" onClick={handleResetTextSearch}>
                                <Icons.IoMdClose />
                            </div>
                        }
                    </form>
                </div>
                {
                    (textSearch as string) ? <>
                        <div className=" top-[56px] fixed  z-[0]  mr-[320px] items-center justify-center w-[370px] bg-white" style={{ boxShadow: "0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)" }}>
                            <div className="text-[15px] font-fontFamily overflow-hidden whitespace-nowrap line-clamp-1 w-[350px] flex border-solid border-[1px]  border-b-[#EFF3F4] border-l-transparent border-r-transparent border-t-transparent h-[45px] items-center pl-[10px]">{t('sideBarRight.searchFor')} {textSearch}</div>
                            {
                                isLoading ? <div><Skeleton /></div> :
                                    (getSearchUser?.data as User[])?.length > 0 && <div className='w-full max-h-[400px] overflow-y-scroll '>
                                        {
                                            getSearchUser?.data.map((item, index) => {
                                                return <div key={index} className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]" onClick={() => handleNavigateUser(item._id)}>
                                                    <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                                        <img src={item.avatar ? item.avatar : DEFAULT_IMAGE_AVATAR} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-[18px] font-fontFamily">{item.username}</h2>
                                                        <p className="text-[16px] font-fontFamily ">@{item.name}</p>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                            }
                        </div>
                    </> : ''
                }
            </div>
        </div>
    )
}
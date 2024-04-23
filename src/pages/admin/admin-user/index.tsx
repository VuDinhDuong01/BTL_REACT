/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { Pagination } from '../../../components/Pagination/Pagination' 
import { PAGE } from '../../../constants' 
import {  customHandle } from '../../../hooks/handleFn'
import { Button } from '../../../components/ui/button' 
import { NotItem } from '../../../components/NotItem/NotItem' 
import { TippySort } from '../../../components/TippySort/TippySort' 
import { Input } from '../../../components/Input'
import { TippyFilter } from '../../../components/TippyFilter/TippyFilter' 
import { TablePost } from '../../../components/TablePost/TablePost' 
import { LoadingSkeleton } from '../../../components/LoadingSkeleton' 
import { Images } from '../../../assets/images'
import { queryList, queryStringSearch } from '../../../hooks'
import { useGetAllUserQuery } from '../../../apis'

const AdminUser = () => {
  const [checkBox, setCheckBox] = useState<string[]>([])
  const [nameSearch, setNameSearch] = useState<string>('')
  const navigate = useNavigate()

  const query: any = queryStringSearch()

  const { data: dataPost,isLoading } = useGetAllUserQuery( {
    
    limit:Number(queryList.limit),
    page:Number(queryList.page)
  } )

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const customSearch = customHandle({ name: nameSearch, page: '1', query, navigate, pathname: PAGE.post })
    customSearch()
  }
  const handleSort = ({ order, sort_by = 'topic' }: { order: string; sort_by: string }) => {
    const customSort = customHandle({
      order,
      page: query.page as string,
      sort_by,
      name: 'username',
      query,
      navigate,
      pathname: PAGE.post
    })
    customSort()
  }

  const handleFilter = ({ name, page = '1' }: { name: string; page?: string }) => {
    const customFilter = customHandle({ name, page, query, navigate, pathname: PAGE.post })
    customFilter()
  }


  return (
    <div className='h-screen 2xl:px-[15px] md:px-[5px] w-full mt-[26px] min-h-screen overflow-scroll'>
      <div className='flex  items-center justify-between mb-[18px] '>
        <h2 className='text-black font-fontFamily text-[24px] font-[600] leading-[20px] mt-[20px]'>Danh mục người dùng</h2>
   
      </div>
      <div className='flex  items-center justify-between '>
        <div className='flex items-center'>
          <form className='flex items-center mr-[10px] cursor-pointer' onSubmit={handleSearch}>
            <Input
              type='text'
              className='border-2 border-[#9D9D9D] w-[300px] h-[32px]  px-[10px] outline-none font-Roboto text-[15px] '
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
            <Button className='w-[32px] h-[32px] rounded-[3px] border border-[#9D9D9D] bg-white flex items-center justify-center'>
              <img src={Images.Search} alt='' className='w-[18px] h-[18px] object-cover' />
            </Button>
          </form>
        </div>
        <TippySort handleSort={handleSort} sort_by='post' title='bài viết' />
      </div>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <TablePost
            setCheckBox={setCheckBox}
            dataPost={(dataPost as any)?.data}
            checkBox={checkBox}
          />
          {(dataPost as any)?.data.length > 0 ? (
            <Pagination
              total_page={dataPost?.total_page as number}
              currentPage={Number(queryList.page)}
              path={PAGE.ADMIN}
              checkBox={checkBox}
            
            />
          ) : (
            <NotItem path={PAGE.ADMIN} />
          )}
        </>
      )}
    </div>
  )
}

export default AdminUser

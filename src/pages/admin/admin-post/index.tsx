/* eslint-disable use-isnan */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { Pagination } from '../../../components/Pagination/Pagination'
import { PAGE } from '../../../constants'
import { customHandle } from '../../../hooks/handleFn'
import { Button } from '../../../components/ui/button'
import { NotItem } from '../../../components/NotItem/NotItem'
import { TippySort } from '../../../components/TippySort/TippySort'
import { Input } from '../../../components/Input'
import { LoadingSkeleton } from '../../../components/LoadingSkeleton'
import { Images } from '../../../assets/images'
import { queryStringSearch } from '../../../hooks'
import { useDeleteManyTweetMutation, useGetAllTweetQuery } from '../../../apis/tweet'
import { TablePost } from '../../../components/table-post'

export const AdminPost = () => {
  const [checkBox, setCheckBox] = useState<string[]>([])
  const [nameSearch, setNameSearch] = useState<string>('')
  const navigate = useNavigate()

  const query: any = queryStringSearch()

  const { data: dataPost, isLoading } = useGetAllTweetQuery({
    limit: isNaN(Number(query.limit)) ? 10 : Number(query.limit),
    page: isNaN(Number(query.page)) ? 1 : Number(query.page),
    order: query.order === '' ? 'desc' : query.order,
    sort_by: query.sort_by,
    content: query.content
  })

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const customSearch = customHandle({ name: nameSearch, page: 1, navigate, pathname: PAGE.USER })
    customSearch()
  }
  const handleSort = ({ order }: { order: string }) => {
    const customSort = customHandle({
      order,
      sort_by: 'content',
      page: isNaN(Number(query.page)) ? 1 : Number(query.page),

      navigate,
      pathname: PAGE.POST
    })
    customSort()
  }
  const [deleteAll] = useDeleteManyTweetMutation()


  return (
    <div className='h-screen 2xl:px-[15px] md:px-[5px] w-full mt-[26px] min-h-screen overflow-scroll'>
      <div className='flex  items-center justify-between mb-[18px] '>
        <h2 className='text-black font-fontFamily text-[24px] font-[600] leading-[20px] mt-[20px]'>Danh mục bài viết</h2>

      </div>
      <div className='flex  items-center justify-between '>
        <div className='flex items-center'>
          {/* <form className='flex items-center mr-[10px] cursor-pointer' onSubmit={handleSearch}>
            <Input
              type='text'
              className='border-2 b border-[#9D9D9D] w-[300px] h-[32px]  px-[10px] outline-none font-Roboto text-[15px] '
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
            <Button className='w-[32px] h-[32px] rounded-[3px] border border-[#9D9D9D] bg-white flex items-center justify-center cursor-pointer'>
              <img src={Images.Search} alt='' className='w-[18px] h-[18px] object-cover' />
            </Button>
          </form> */}
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
          {(dataPost as any)?.data?.length > 0 ? (
            <Pagination
              total_page={dataPost?.total_page as number}
              currentPage={isNaN(Number(query.page)) ? 1 : Number(query.page)}
              path={PAGE.POST}
              checkBox={checkBox}
              deleteAll={deleteAll}

            />
          ) : (
            <NotItem path={PAGE.POST} />
          )}
        </>
      )}
    </div>
  )
}



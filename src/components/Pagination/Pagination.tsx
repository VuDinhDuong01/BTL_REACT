import range from 'lodash/range'
import clsx from 'clsx'
import { useNavigate, createSearchParams } from 'react-router-dom'

import { queryList } from '../../hooks';
import { Button } from '../ui/button';
import { Images } from '../../assets/images';
import { confirmAlert } from 'react-confirm-alert';
import { useDeleteManyUserMutation } from '../../apis';

interface PaginationType {
  total_page: number
  currentPage: number,
  path: string,
  checkBox: string[]
}

const RANGE = 2
export const Pagination = ({ total_page, currentPage, path, checkBox }: PaginationType) => {
  const [deleteAllUser] = useDeleteManyUserMutation()
  const navigate = useNavigate()
  let showDotBefore = true
  let showDotAfter = true

  const dotBefore = () => {
    if (showDotBefore) {
      showDotBefore = false
      return <Button className='w-[24px] h-[24px] border text-[14px] border-[#D5D8DD] bg-white font-Roboto'>...</Button>
    }
    return showDotBefore
  }
  const dotAfter = () => {
    if (showDotAfter) {
      showDotAfter = false
      return <Button className='w-[24px] h-[24px] border text-[14px] border-[#D5D8DD] bg-white font-Roboto'>...</Button>
    }
    return showDotAfter
  }

  const handlePageChange = (indexPage: number) => {
    navigate({
      pathname:path,
      search: createSearchParams({
        ...queryList,
        page: indexPage.toString()

      }).toString()
    })

  }
  const handlePrevPage = () => {
    if (currentPage === 1) return
    navigate({
      pathname:path,
      search: createSearchParams({
        ...queryList,
        page: (currentPage - 1).toString()
      }).toString()
    })
  }

  const handleNextPage = () => {
    if (Number(currentPage) === Number(total_page)) return
    navigate({
      pathname:path,
      search: createSearchParams({
        ...queryList,
        page: (currentPage + 1).toString()
      }).toString()
    })
  }

  const Pagination = () => {
    return range(total_page).map((page, index) => {
      const indexPage = page + 1
      if (currentPage <= RANGE * 2 && indexPage > currentPage + RANGE && indexPage < total_page - RANGE + 2) {
        return <div key={index}>{dotBefore()}</div>
      } else if (currentPage > RANGE * 2 && currentPage <= total_page - RANGE * 2) {
        if (indexPage > RANGE - 1 && indexPage < currentPage - RANGE) {
          return <div key={index}>{dotBefore()}</div>
        } else if (indexPage > currentPage + RANGE && indexPage < total_page - RANGE + 2) {
          return <div key={index}>{dotAfter()}</div>
        }
      } else if (currentPage > total_page - RANGE * 2 && indexPage > RANGE - 1 && indexPage < currentPage - RANGE) {
        return <div key={index}>{dotAfter()}</div>
      }
      return <Button key={index} className={clsx({
        ['w-[24px] h-[24px] border text-[14px] border-[#D5D8DD] font-fontFamily']: true,
        ['text-white bg-[#186E25]']: currentPage === indexPage,
        ['bg-white text-[#000]']: currentPage
          !== indexPage
      })} onClick={() => handlePageChange(indexPage)}>{indexPage}</Button>
    })
  }


  const handleAllDelete = async() => {
    if (checkBox.length > 0) {
      try {
        confirmAlert({
          message: 'Bạn có chắc chắn xóa các user này không?',
          buttons: [
            {
              label: 'Yes',
              onClick: async () => await deleteAllUser({
                manyId: checkBox!
              })
            },
            {
              label: 'No',
            }
          ]
        });

      } catch (error: unknown) {
        console.log(error)
      }
    }
  }
  return (
    <div className="bg-[#E3E5E8] h-[45px] flex items-center justify-between px-[10px]">
      <div className='flex items-center gap-[16px]'>
        <div className='flex items-center w-[49px] justify-center h-[24px] rounded-[3px] bg- border border-[#D5D8DD]'>
          <p className='text-[16px] text-[#393939] mr-[6px]'>50</p>
          <img src={Images.Check_image} alt="" className='object-cover' />
        </div>

        <button className={clsx({
          ['px-[8px] py-[6px] flex items-center justify-center mb-[2px]  text-[16px] font-fontFamily text-white font-[500]']: true,
          ['cursor-not-allowed bg-[#db5f5f]']: checkBox.length === 0,
          ['cursor-pointer bg-[red]']: checkBox.length > 0
        })} onClick={handleAllDelete}>Xóa</button>
      </div>
      <div className="flex items-center">
        <button className={clsx({
          ['w-[24px] h-[24px] ]  text-[14px] font-fontFamily   bg-white flex items-center justify-center']: true,
          ['cursor-not-allowed']: currentPage === 1
        })} onClick={handlePrevPage}><img src={Images.Left} alt="" className='w-[15px] h-[15px] object-cover cursor-pointer' /></button>
        {Pagination()}
        <button className={clsx({
          ['w-[24px] h-[24px]  text- text-[14px] font-fontFamily flex items-center justify-center bg-white']: true,
          ['cursor-not-allowed']: currentPage === total_page
        })} onClick={handleNextPage}><img src={Images.Right} alt="" className='w-[15px] h-[15px] object-cover' /></button>
      </div>
    </div>
  )
}

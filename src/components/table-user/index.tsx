/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { confirmAlert } from 'react-confirm-alert';
import { CustomCheckAll, CustomCheckBox } from "../../hooks/useCheckBox"
import { useMemo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import omit from 'lodash/omit'
import { Images } from "../../assets/images"

import { useDeleteUserMutation } from "../../apis";
import { getProfileToLS } from '../../helps';
import { queryStringSearch } from '../../hooks';
interface TablePostType {
  dataPost: any[]
  checkBox: string[]
  setCheckBox: React.Dispatch<React.SetStateAction<string[]>>
}

export const TableUser = ({ dataPost, setCheckBox, checkBox }: TablePostType) => {
  const navigate = useNavigate()
  const query: any = queryStringSearch()
  const handleCheckAll = () => {
    CustomCheckAll({ checkBox, setCheckBox, data: dataPost })
  }
  const profile = getProfileToLS() as { user_id: string }
  const handleCheckBox = (_id: string) => {
    CustomCheckBox({ _id, setCheckBox, checkBox })
  }
  const [deleteUser] = useDeleteUserMutation()
  const handleDeleteUser = (user_id: string) => {
    try {
      confirmAlert({
        message: 'Bạn có chắc chắn xóa user này không?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              await deleteUser({
                user_id: user_id!
              })
              navigate({
                pathname: '/admin/all_user',
                search: createSearchParams({
                  ...omit(query, ['title', 'title_tweet', 'id_user']),
                  page: '1'
                }).toString()
              })
            }
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

  const listUser = useMemo(() => {
    return dataPost?.filter(user => user._id !== profile.user_id)
  }, [dataPost])


  return (
    <table className=" mt-[16px]  w-full  border-solid border border-gray-300">
      <thead>
        <tr className="bg-green1 h-[45px] w-full flex ">
          <th className="2xl:w-[3%] md:w-[4%]  flex items-center justify-center" >
            <input type="checkbox" checked={listUser?.length === checkBox?.length && checkBox?.length !== 0} onChange={handleCheckAll} className="w-[15px] h-[15px] rounded-[3px] bg-[#fff] flex items-center justify-center" />
          </th>
          <th className='2xl:w-[15%] md:w-[8%] custom-class-table-th-post'>ID</th>
          <th className='2xl:w-[15%] md:w-[15%] custom-class-table-th-post'>Tên người dùng</th>
          <th className='2xl:w-[17%] md:w-[15%] custom-class-table-th-post'>Email</th>
          <th className='2xl:w-[15%] md:w-[15%] custom-class-table-th-post'>Bio</th>
          <th className='2xl:w-[12%] md:w-[20%] custom-class-table-th-post'>Địa chỉ</th>
          <th className='2xl:w-[12%] md:w-[15%] custom-class-table-th-post'>Website</th>
          <th className='flex-1 custom-class-table-th-post'>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {
          listUser?.map((post, index) => {

            return <tr className=" w-full  flex" key={index}>
              <td className="2xl:w-[3%] md:w-[4%] border flex items-center justify-center ">
                <input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-white cursor-pointer"
                  checked={checkBox.includes(post._id)}
                  onChange={() => handleCheckBox(post._id)} /></td>
              <td className='2xl:w-[15%]   md:w-[8%] border  2xl:flex items-center justify-center text-[#393939] font-fontFamily 2xl:text-[16px] md:text-[14px] font-[400] leading-[45px]'>{post._id}</td>
              <td className='2xl:w-[15%] md:w-[15%]  custom-class-table-td-post items-center justify-center'>{post.name}</td>
              <td className='2xl:w-[17%] md:w-[15%]  custom-class-table-td-post items-center justify-center'>{post.email}</td>
              <td className='2xl:w-[15%] md:w-[15%] custom-class-table-td-post items-center justify-center'>{post.bio === '' ? '_' : post.bio}</td>
              <td className='2xl:w-[12%] md:w-[20%] custom-class-table-td-post items-center justify-center'>{post.location === '' ? '_' : post.location}</td>
              <td className='2xl:w-[12%] md:w-[15%] border justify-center flex items-center 2xl:pl-[12px] flex-wrap whitespace-normal break-words md:pl-[5px] text-[#393939] font-Roboto text-[16px] font-[400] leading-[45px]'>{post.website !== '' ? post.website : '_'}
              </td>
              <td className='flex-1 custom-class-table-td-post pl-0 items-center justify-center'>
                <img src={Images.deleteImage} alt="" className="w-[20px]  h-[20px] cursor-pointer" onClick={() => handleDeleteUser(post._id)} />
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

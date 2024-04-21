import { useContext } from "react"

import { Theme } from "~/hook"
import { CustomCheckAll, CustomCheckBox } from "~/hook/useCheckBox"
import { PostType } from "~/types/post.types"
import { Images, getHouse } from "~/utils/index"

interface TablePostType {
  // handleUpdatePost?: (post_id: string) => void
  dataPost: PostType[]
  checkBox: string[]
  setCheckBox: React.Dispatch<React.SetStateAction<string[]>>
}

export const TablePost = ({ handleUpdatePost, dataPost, setCheckBox, checkBox }: TablePostType) => {
  const { setToggle, setIdDelete } = useContext(Theme)

  const handleCheckAll = () => {
    CustomCheckAll({ checkBox, setCheckBox, data: dataPost })
  }
  const handleCheckBox = (_id: string) => {
    CustomCheckBox({ _id, setCheckBox, checkBox })
  }
  return (
    <table className=" mt-[16px]  w-full   border border-gray-300">
      <thead>
        <tr className="bg-green h-[45px] w-full flex ">
          <th className="2xl:w-[3%] md:w-[4%]  flex items-center justify-center">
            <input type="checkbox" checked={dataPost.length === checkBox.length && checkBox.length !== 0} onChange={handleCheckAll} className="w-[15px] h-[15px] rounded-[3px] bg-[#fff] flex items-center justify-center" />
          </th>
          <th className='2xl:w-[4%] md:w-[8%] custom-class-table-th-post'>ID</th>
          <th className='2xl:w-[30%] md:w-[15%] custom-class-table-th-post'>Tên bài viết</th>
          <th className='2xl:w-[17%] md:w-[15%] custom-class-table-th-post'>Mô tả</th>
          <th className='2xl:w-[15%] md:w-[15%] custom-class-table-th-post'>Tác giả</th>
          <th className='2xl:w-[12%] md:w-[20%] custom-class-table-th-post'>Chủ đề</th>
          <th className='2xl:w-[12%] md:w-[15%] custom-class-table-th-post'>Ngày đăng bài</th>
          <th className='flex-1 custom-class-table-th-post'>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {
          dataPost?.map((post, index) => {
            const row = index + 10000
            return <tr className=" w-full  flex" key={index}>
              <td className="2xl:w-[3%] md:w-[4%] border flex items-center justify-center ">
                <input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-white"
                  checked={checkBox.includes(post._id)}
                  onChange={() => handleCheckBox(post._id)} /></td>
              <td className='2xl:w-[4%]   md:w-[8%] border  2xl:flex items-center justify-center text-[#393939] font-Roboto 2xl:text-[16px] md:text-[14px] font-[400] leading-[45px]'>{row}</td>
              <td className='2xl:w-[30%] md:w-[15%]  custom-class-table-td-post'>{post.post}</td>
              <td className='2xl:w-[17%] md:w-[15%]  custom-class-table-td-post'>{post.describe}</td>
              <td className='2xl:w-[15%] md:w-[15%] custom-class-table-td-post'>{post.author}</td>
              <td className='2xl:w-[12%] md:w-[20%] custom-class-table-td-post'>{post.topic}</td>
              <td className='2xl:w-[12%] md:w-[15%] border   flex items-center 2xl:pl-[12px] flex-wrap whitespace-normal break-words md:pl-[5px] text-[#393939] font-Roboto text-[16px] font-[400] leading-[45px]'>{getHouse(post.created_at)}</td>
              <td className='flex-1 custom-class-table-td-post pl-0 justify-center'>
              
                {/* <img src={Images.UpdateImage} alt="" className="w-[20px] h-[20px] 2xl:mx-[10px] cursor-pointer" onClick={() => handleUpdatePost(post._id as string)} /> */}
                <img src={Images.deleteImage} alt="" className="w-[20px]  h-[20px] cursor-pointer" onClick={() => {
                  setIdDelete(post._id as string)
                  setToggle(true)
                }} />
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

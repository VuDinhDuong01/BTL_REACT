
import { Link } from 'react-router-dom'

export const NotItem = ({path}:{path: string}) => {
  return (
    <div className="w-[80%] h-[400px] m-auto mt-[100px] flex flex-col items-center justify-center rounded-[10px] bg-green text-white font-Roboto text-[18px] font-[600]">
      <p>Không có mục nào trong danh sách được tìm thấy.</p>
      <Link to={path}>
        <button className='px-[10px] py-[10px] bg-[#666] rounded-md mt-[15px]'>Quay lại</button>
      </Link>
    </div>
  )
}

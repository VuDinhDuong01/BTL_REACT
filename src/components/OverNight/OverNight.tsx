import { useContext } from "react"
import { createPortal } from "react-dom"

import { Theme } from "~/hook/useContext"
import { Button } from "../Button/Button"

interface OverNightType {
  handleDelete: (id: string) => void
}

export const OverNight = ({ handleDelete }: OverNightType) => {
  const { setToggle, idDelete } = useContext(Theme)
  const root = document.getElementById('root') as HTMLElement;
  return (
    createPortal(<div className="w-full h-[100vh] bg-[rgba(0,0,0,0.6)] overflow-hidden z-[99] fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className='w-[500px] py-[70px] bg-white rounded-[10px] flex flex-col items-center justify-center'>
        <h2 className='text-[20px] font-Roboto text-black'>Bạn có muốn xóa không !</h2>
        <div className='flex items-center justify-center gap-[20px] mt-[20px]'>
          <Button className='w-[100px] h-[50px] rounded-[5px] bg-[#6C757D] text-white text-[16px] font-Roboto' onClick={() => setToggle(false)}>Quay lại</Button>
          <div>
            <Button className='w-[100px] h-[50px] rounded-[5px] bg-[#007BFF] text-white text-[16px] font-Roboto' onClick={() => handleDelete(idDelete)}>Đồng ý</Button>
          </div>
        </div>
      </div>
    </div>, root)
  )
}


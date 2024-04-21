
import { HeadlessTippy } from '../Tippy/Typpy'
import { Button } from '../Button/Button'
import { Images } from '~/utils'

interface ObjectFilter {
  itemName0:string 
  itemName1: string,
  itemName2: string,
  itemName3: string,
}

interface TippyFilterType {
  handleFilter: ({ name }: { name: string }) => void,
  ObjectFilter: ObjectFilter
}
export const TippyFilter = ({ handleFilter, ObjectFilter }: TippyFilterType) => {
  
  return (
    <HeadlessTippy childrenTippy={<div className='flex flex-col bg-white z-10 rounded-sm cursor-pointer mr-[10px]'>
      <Button className='px-[10px] py-[15px] text-black font-Roboto text-[18px] w-full hover:bg-[#ccc] z-10 border-b border-b-[#ccc] ' onClick={() => handleFilter({ name: '' })}>Tất cả</Button>
      <Button className='px-[10px] py-[15px] text-black font-Roboto text-[18px] w-full hover:bg-[#ccc] z-10 border-b border-b-[#ccc] ' onClick={() => handleFilter({ name: ObjectFilter.itemName1 })}>{ObjectFilter.itemName1}</Button>
      <Button className='px-[10px] py-[15px] text-black font-Roboto text-[18px]  w-full hover:bg-[#ccc] z-10 border-b border-b-[#ccc] ' onClick={() => handleFilter({ name: ObjectFilter.itemName2 })}>{ObjectFilter.itemName2}</Button>
      <Button className='px-[10px] py-[15px] text-black font-Roboto text-[18px]  w-full hover:bg-[#ccc] z-10' onClick={() => handleFilter({ name: ObjectFilter.itemName3 })}>{ObjectFilter.itemName3}</Button>
    </div>}>
      <button className="w-[84px] h-[32px] shrink-0 bg-white border border-[#9D9D9D] flex items-center justify-center rounded-[3px]">
        <img src={Images.Filter} alt="" className="w-[18px] h-[18px] object-cover mr-[4px]" />
        <p className="text-[#000] font-Roboto text-[14px] font-[400]">Bộ lọc</p>
      </button>
    </HeadlessTippy>
  )
}

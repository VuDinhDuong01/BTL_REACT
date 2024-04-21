import { HeadlessTippy } from '../Tippy/Typpy'
import { Images } from '~/utils'


interface TippySort {
  handleSort: ({ order, sort_by }: {
    order: string;
    sort_by: string;

  }) => void,
  sort_by: string,
  title: string
}
export const TippySort = ({ handleSort, sort_by, title }: TippySort) => {

  return (
    <HeadlessTippy childrenTippy={<div className='flex flex-col bg-[white] z-10 rounded-sm cursor-pointer mr-[10px]'>
      <button className='px-[10px] py-[15px] text-black font-Roboto text-[18px] w-full hover:bg-[#ccc] z-10 border-b border-b-[#ccc] ' onClick={() => handleSort({
        order: 'asc',
        sort_by,

      })}>{`Sắp xếp theo ${title} (A-Z)`}</button>
      <button className='px-[10px] py-[15px] text-black font-Roboto text-[18px]  w-full hover:bg-[#ccc] z-10' onClick={() => handleSort({ order: 'desc', sort_by })}>{`Sắp xếp theo ${title} (Z-A)`}</button>
    </div>}>
      <button className="w-[87px] h-[32px] shrink-0 bg-[#fff] border border-[#9D9D9D] rounded-[3px] flex items-center justify-center " >
        <img src={Images.Sort} alt="" className="w-[18px] h-[18px] object-cover mr-[4px]" />
        <p className="text-[#000] font-Roboto text-[14px] font-[400]">Sắp xếp</p>
      </button>
    </HeadlessTippy>
  )
}

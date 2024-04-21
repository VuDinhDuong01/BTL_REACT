import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const LoadingSkeleton = () => {
  const skeletonRows = [];
  for (let i = 0; i < 15; i++) {
    skeletonRows.push(
      <tr key={i} className=" h-[45px] w-full flex">
        <td className="2xl:w-[3%] md:w-[4%] border  flex items-center justify-center h-full m-auto">
          <Skeleton width={15} height={15} circle={true} />
        </td>
        <td className='2xl:w-[4%] md:w-[8%] border flex items-center justify-center px-0 py-0 h-full'>
          <div className='w-[80%]'>
            <Skeleton height={20} className='w-full flex items-center justify-center' />
          </div>
        </td>
        <td className='2xl:w-[30%] md:w-[15%] border flex items-center justify-center px-0 py-0 h-full '>
          <div className='w-[80%]'>
            <Skeleton height={20} className='w-full flex items-center justify-center' />
          </div>
        </td>
        <td className='2xl:w-[17%] md:w-[15%] border flex items-center justify-center px-0 py-0'>
          <div className='w-[80%]'>
            <Skeleton height={20} className='w-full flex items-center justify-center' />
          </div>
        </td>
        <td className='2xl:w-[15%] md:w-[15%] border flex items-center justify-center px-0 py-0'>
          <div className='w-[80%]'>
            <Skeleton height={20} className='w-full flex items-center justify-center' />
          </div>
        </td>
        <td className='2xl:w-[15%] md:w-[20%] border flex items-center justify-center px-0 py-0'>
          <div className='w-[80%]'>
            <Skeleton height={20} className='w-full flex items-center justify-center' />
          </div>
        </td>
        <td className='2xl:w-[12%] md:w-[15%] border flex items-center justify-center px-0 py-0'>
          <div className='w-[80%]'>
            <Skeleton height={20} className='w-full flex items-center justify-center' />
          </div>
        </td>
        <td className='flex-1 border flex items-center justify-center px-0 py-0'>
          <div className='w-[80%]'>
            <Skeleton height={20} className='w-full flex items-center justify-center' />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <table className=" border mt-[16px]  w-full table-fixed border-collapse border border-gray-300">
      <thead>
        <tr className="bg-[#186E25] h-[45px] w-full flex ">
          <th className="2xl:w-[3%] md:w-[4%] border  flex items-center justify-center"><input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-[#fff]" /></th>
          <th className='2xl:w-[4%] md:w-[8%] custom-class-table-th-post'>ID</th>
          <th className='xl:w-[30%] md:w-[15%] custom-class-table-th-post'>Tên bài viết</th>
          <th className='2xl:w-[17%] md:w-[15%] custom-class-table-th-post'>Mô tả</th>
          <th className='2xl:w-[15%] md:w-[15%] custom-class-table-th-post'>Tác giả</th>
          <th className='2xl:w-[15%] md:w-[20%] custom-class-table-th-post'>Chủ đề</th>
          <th className='2xl:w-[12%] md:w-[15%] custom-class-table-th-post'>Ngày đăng bài</th>
          <th className='flex-1 custom-class-table-th-post'>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {skeletonRows}
      </tbody>
    </table>

  );
}

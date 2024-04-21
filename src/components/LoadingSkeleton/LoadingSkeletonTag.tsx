import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export const LoadingSkeletonTag = () => {
  const skeletonRows = [];
  for (let i = 0; i < 15; i++) {
    skeletonRows.push(
      <tr key={i} className=" h-[45px] w-full flex">
        <td className="w-[50px] border  flex items-center justify-center h-full m-auto">
          <Skeleton width={15} height={15} circle={true} />
        </td>
        <td className='flex-1 border flex items-center justify-center px-0 py-0 h-full'>
        <div className='w-[80%]'>
            <Skeleton height={20} className='w-full flex items-center justify-center' />
          </div>
        </td>
        <td className='md:w-[15%] 2xl:w-[10%] border flex items-center justify-center px-0 py-0 h-full '>
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
        <tr className="bg-green h-[45px] w-full flex ">
          <th className="w-[50px] border  flex items-center justify-center"><input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-[#fff]" /></th>
          <th className='flex-1 custom-class-table-th-post'>Tag</th>
          <th className='md:w-[15%] 2xl:w-[10%] custom-class-table-th-post'>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {skeletonRows}
      </tbody>
    </table>

  );
}

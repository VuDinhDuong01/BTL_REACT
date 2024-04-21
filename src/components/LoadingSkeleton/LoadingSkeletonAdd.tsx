import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const LoadingSkeletonAdd = () => {
  return (
    <div className='mt-[30px] '><Skeleton count={3} height={50} className='mb-[10px]' /></div>
  )
}


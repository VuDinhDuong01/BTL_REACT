/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { confirmAlert } from 'react-confirm-alert';
import { CustomCheckAll, CustomCheckBox } from "../../hooks/useCheckBox"
import { createSearchParams, useNavigate } from 'react-router-dom';
import omit from 'lodash/omit'
import { Images } from "../../assets/images"

import { queryStringSearch } from '../../hooks';
import { formatDate } from '../../helps/convert-date-to-hour';
import { useDeleteTweetMutation } from '../../apis/tweet';
interface TablePostType {
    dataPost: any[]
    checkBox: string[]
    setCheckBox: React.Dispatch<React.SetStateAction<string[]>>
}

export const TablePost = ({ dataPost, setCheckBox, checkBox }: TablePostType) => {
    const navigate = useNavigate()
    const query: any = queryStringSearch()
    const handleCheckAll = () => {
        CustomCheckAll({ checkBox, setCheckBox, data: dataPost })
    }
    const handleCheckBox = (_id: string) => {
        CustomCheckBox({ _id, setCheckBox, checkBox })
    }
    const [deleteTweet] = useDeleteTweetMutation()
    const handleDeleteUser = (user_id: string) => {
        try {
            confirmAlert({
                message: 'Bạn có chắc chắn xóa bài viết này không?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            await deleteTweet({
                                user_id: user_id!
                            })
                            navigate({
                                pathname: '/admin/all_tweet',
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

    return (
        <table className=" mt-[16px]  w-full  border-solid border border-gray-300">
            <thead>
                <tr className="bg-green1 h-[45px] w-full flex ">
                    <th className="2xl:w-[3%] md:w-[4%]  flex items-center justify-center" >
                        <input type="checkbox" checked={dataPost?.length === checkBox?.length && checkBox?.length !== 0} onChange={handleCheckAll} className="w-[15px] h-[15px] rounded-[3px] bg-[#fff] flex items-center justify-center" />
                    </th>
                    <th className='2xl:w-[25%] md:w-[15%] custom-class-table-th-post'>Nội dung</th>
                    <th className='2xl:w-[17%] md:w-[15%] custom-class-table-th-post'>Ảnh đăng</th>
                    <th className='2xl:w-[17%] md:w-[15%] custom-class-table-th-post'>Người đăng</th>
                    <th className='2xl:w-[12%] md:w-[15%] custom-class-table-th-post'>Số lượt xem</th>
                    <th className='2xl:w-[12%] md:w-[20%] custom-class-table-th-post'>Ngày tạo</th>
                    <th className='flex-1 custom-class-table-th-post'>Thao tác</th>
                </tr>
            </thead>

            <tbody>
                {
                    dataPost?.map((post, index) => {

                        return <tr className=" w-full  flex" key={index}>
                            <td className="2xl:w-[3%] md:w-[4%] border flex items-center justify-center ">
                                <input type="checkbox" className="w-[15px] h-[15px] rounded-[3px] bg-white cursor-pointer"
                                    checked={checkBox.includes(post?._id)}
                                    onChange={() => handleCheckBox(post?._id)} /></td>

                            <td className='2xl:w-[25%] md:w-[15%]  custom-class-table-td-post items-center justify-center'>{post.content}</td>
                            <td className='2xl:w-[17%] md:w-[15%]  custom-class-table-td-post items-center justify-center flex  '>{
                                post?.medias?.length > 0 && post?.medias[0] !== null ? post?.medias?.map((image: string, index: number) => {
                                    return <img src={image} alt='image' key={index} className='w-[40px] h-[40px] object-cover mr-[10px]' />
                                }) : '_'
                            }</td>
                            <td className='2xl:w-[17%] md:w-[15%] custom-class-table-td-post items-center justify-center'>{post?.user[0]?.name}</td>
                            <td className='2xl:w-[12%] md:w-[20%] custom-class-table-td-post items-center justify-center'>{post.user_views}</td>
                            <td className='2xl:w-[12%] md:w-[15%] border justify-center flex items-center 2xl:pl-[12px] flex-wrap whitespace-normal break-words md:pl-[5px] text-[#393939] font-Roboto text-[16px] font-[400] leading-[45px]'>{formatDate(post.created_at)}
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

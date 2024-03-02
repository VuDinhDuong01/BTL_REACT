import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { Images } from "../../assets/images"
import { Icons } from "../../helps/icons"
import { useSearch } from '../../hooks/useSearch'

const listSearch = [
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
    {
        avatar: Images.background,
        username: 'Dương lò vôi',
        name: 'duonglovoi'
    },
]



export const Search = () => {
    
    const [countCharSearch, setCountCharSearch] = useState<number>(0)
    const { register, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            search: ''
        }
    })
    const onSubmit = (handleSubmit(data => {
        console.log(data)
    }))
    const handleResetTextSearch = () => {
        reset({ search: '' })
        setCountCharSearch(0)
    }

    const text = getValues('search')
    const { textSearch } = useSearch({ value: text, delay: 1000 })

    return (
        <div className=''>
            <div className='w-full relative '>
                <div>
                    <form className="w-full fixed top-[6px] py-[5px]" onSubmit={onSubmit}>
                        <input
                            className="w-[370px] focus:outline-none relative  focus:border-[1px] focus:border-solid focus:border-green2 !rounded-[50px] pl-[40px] font-fontFamily !pr-[45px] text-[16px] h-[45px] bg-[#EFF3F4] outline-none border-none"
                            placeholder="Search"
                            {...register('search', {
                                onChange: (e) => setCountCharSearch(e.target.value.length)
                            })}
                        />
                        <div className=" absolute top-[15px] left-[10px] text-[#EFF3F4]">
                            <Icons.IoIosSearch size={25} />
                        </div>
                        {
                            countCharSearch > 0 && <div className="w-[20px] h-[20px] bg-green2 rounded-[50%] text-white flex items-center justify-center cursor-pointer absolute top-[17px] left-[340px]" onClick={handleResetTextSearch}>
                                <Icons.IoMdClose />
                            </div>
                        }
                    </form>
                </div>
                {/* <div className=" top-[56px] fixed  z-[0]  mr-[320px] items-center justify-center w-[370px] bg-white" style={{ boxShadow: "0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)" }}> 
                    <div className="text-[15px] font-fontFamily overflow-hidden whitespace-nowrap line-clamp-1 w-[350px] flex border-solid border-[1px]  border-b-[#EFF3F4] border-l-transparent border-r-transparent border-t-transparent h-[45px] items-center pl-[10px]">Search for {text}</div>
                    {
                        listSearch.length > 0 && <div className='w-full max-h-[400px] overflow-y-scroll '>
                            {
                                listSearch?.map((item, index) => {
                                    return <div key={index} className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                                        <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                            <img src={item.avatar} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                                        </div>
                                        <div>
                                            <h2 className="text-[18px] font-fontFamily">{item.username}</h2>
                                            <p className="text-[16px] font-fontFamily ">{item.name}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    }

                </div> */}
            </div>
        </div>
    )
}
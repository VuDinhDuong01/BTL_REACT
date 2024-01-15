import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { Images } from "../../assets/images"
import { Icons } from "../../helps/icons"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popver"


export const Search = () => {
    const [countCharSearch, setCountCharSearch] = useState<number>(0)
  
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            search: ''
        }
    })
    const onSubmit = (handleSubmit(data => {
        console.log(data)
    }))
    const handleResetTextSearch=()=>{
        reset({search:''})
        setCountCharSearch(0)
    }
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild className="">
                    <form className="w-full fixed top-[6px]  py-[5px]" onSubmit={onSubmit}>
                        <input
                            className="w-[370px] focus:outline-none relative   focus:border-[1px] focus:border-solid focus:border-green2  !rounded-[50px] pl-[40px] font-fontFamily !pr-[45px] text-[16px] h-[45px] bg-[#EFF3F4] outline-none border-none"
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
                </PopoverTrigger>
                <PopoverContent className="!px-0  flex mr-[320px] max-h-[800px] overflow-y-scroll items-center justify-center  min-h-[300px]  w-[370px] bg-white" style={{ boxShadow: "0 0 15px rgba(101,119,134,0.2), 0 0 3px 1px rgba(101,119,134,0.15)" }}>
                    <div className="w-full ">
                        <div className="text-[15px] font-fontFamily w-full h-[45px] border-solid border-[1px] border-b-[#EFF3F4] border-l-transparent border-r-transparent border-t-transparent flex items-center pl-[10px]">Search for "Hello"</div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>  <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>
                        <div className="w-full flex items-center px-[10px]  py-[10px] cursor-pointer hover:bg-[#EFF3F4]">
                            <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                <img src={Images.background} alt="avatar" className="w-[40px] h-[40px] object-cover rounded-md" />
                            </div>
                            <div>
                                <h2 className="text-[18px] font-fontFamily">Vũ Đình Dương</h2>
                                <p className="text-[16px] font-fontFamily ">@duonglovoi</p>
                            </div>
                        </div>


                    </div>

                </PopoverContent>
            </Popover>

        </div>
    )
}
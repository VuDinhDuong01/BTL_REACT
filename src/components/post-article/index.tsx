import { Icons } from "../../helps/icons"
import { Button } from "../ui/button"
import { Images } from "../../assets/images"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popver"


const listIcons = [
    {
        id: 1,
        icons: <Icons.GoFileMedia size={20} />,
        title: 'Media'
    },
    {
        id: 2,
        icons: <Icons.HiOutlineGif size={20} />,
        title: 'Gif'
    },
    {
        id: 3,
        icons: <Icons.MdOutlineEmojiEmotions size={20} />,
        title: 'Emoji'
    },
    {
        id: 4,
        icons: <Icons.CiLocationOn size={20} />,
        title: 'Location'
    },
    {
        id: 5,
        icons: <Icons.SiApollographql size={20} />,
        title: 'Poll'
    },
    {
        id: 6,
        icons: <Icons.MdOutlinePoll size={20} />,
        title: 'Line'
    },
]

export const PostArticle = () => {
    return (
        <form className="w-[611px] min-h-[155px]">
            <div className="w-full min-h-[100px] flex items-center   border-b-[1px] border-solid border-[#EFF3F4] border-r-transparent border-l-transparent border-t-transparent">
                <div className="w-[65px] ml-[10px]">
                    <img src={Images.bg} className="w-[40px] h-[40px] rounded-[50%] " />
                </div>
                <div className="flex-1 ">
                    <textarea placeholder="What is happening?" className="text-[20px] !text-black  bg-transparent font-fontFamily  w-full l-[5px] border-none" />
                    <Popover>
                        <PopoverTrigger asChild className="">
                            <div className="w-full cursor-pointer items-center flex text-green2 ">
                                <Icons.AiOutlineGlobal />
                                <p className="ml-[3px] text-[14px] font-fontFamily font-[700] text-green2 ">Everyone can reply</p>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className=" !z-[9999] flex items-center justify-center ml-[-330px]">
                            <div className="">
                                <div>
                                    <h3 className="text-[17px] font-fontFamily">Who can reply?</h3>
                                    <p className="text-[14px] font-fontFamily">Choose who can reply to this post. Anyone mentioned can always reply</p>
                                </div>
                                <div className="w-full ">
                                    <div className="w-full flex items-center  py-[6px] cursor-pointer hover:bg-[red]">
                                        <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                        <Icons.AiOutlineGlobal />
                                        </div>
                                        <h3 className="text-[17px] font-fontFamily ">Everyone</h3>
                                    </div>
                                    <div className="w-full flex items-center  py-[6px] cursor-pointer hover:bg-[red]">
                                        <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                        <Icons.MdManageAccounts />
                                        </div>
                                        <h3 className="text-[17px] font-fontFamily ">Accounts you follow</h3>
                                    </div>
                                    <div className="w-full flex items-center  py-[6px] cursor-pointer hover:bg-[red]">
                                        <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                        <Icons.IoSettingsOutline />
                                        </div>
                                        <h3 className="text-[17px] font-fontFamily ">Verified accounts</h3>
                                    </div>
                                    <div className="w-full flex items-center  py-[6px] cursor-pointer hover:bg-[red]">
                                        <div className="text-white w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-green2 mr-[15px]">
                                        <Icons.SiOnlyoffice />
                                        </div>
                                        <h3 className="text-[17px] font-fontFamily ">Only accounts you mention</h3>
                                    </div>
                               
                                   
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                </div>
            </div>
            <div className="w-[611px] h-[55px] flex items-center border-b-[1px] border-solid border-[#EFF3F4] border-r-transparent border-l-transparent border-t-transparent">
                <div className="w-[65px] "></div>
                <div className="flex-1 flex items-center justify-between h-full ">
                    <div className="w-full flex items-center">
                        {
                            listIcons.map(item => {
                                return <div key={item.id} title={item.title} className="w-[35px]  h-[35px] hover:bg-[#b9daef] text-green2 flex items-center justify-center rounded-[50%] cursor-pointer">
                                    {item.icons}
                                </div>
                            })
                        }
                    </div>

                    <Button className="!text-[15px] 
                    !font-[700] text-[white] font-fontFamily mr-[15px] bg-green2  px-[15px] cursor-pointer !rounded-[50px] flex items-center justify-center">Post</Button>

                </div>
            </div>
        </form>
    )
}
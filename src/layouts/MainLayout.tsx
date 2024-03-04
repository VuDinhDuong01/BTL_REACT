import { SidebarLeft } from "../components/sidebar-left"
import { SidebarRight } from "../components/sidebar-right"

import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className="max-w-[1230px] m-auto flex ">
      <div className="w-[250px] fixed  border-r-[#EFF3F4] border-solid border-t-transparent  border-l-transparent  border-b-transparent border-r-[1px]   ">
        <SidebarLeft />
      </div>
      <div className="flex-1 ml-[250px]">
        <Outlet />
      </div>
      <div className="w-[370px]  border-l-[#EFF3F4] border-solid border-t-transparent  border-r-transparent  border-b-transparent border-l-[1px] ">
        <SidebarRight />
      </div>
      {/* <TweetDetail /> */}
    </div>
  )
}

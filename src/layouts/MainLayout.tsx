import { SidebarLeft } from "../components/sidebar-left"
import { SidebarRight } from "../components/sidebar-right"

import { Outlet } from 'react-router-dom'
export const MainLayout = () => {
  return (
    <div className="max-w-[1230px] m-auto flex mt-[5px]">
      <div className="w-[250px] fixed  border-rose-600  border-r-4 ">
        <SidebarLeft />
      </div>
      <div className="flex-1 bg-[red] ml-[250px]">
        <Outlet />
      </div>
      <div className="w-[370px] bg-[blue]">
        <SidebarRight />
      </div>
    </div>
  )
}

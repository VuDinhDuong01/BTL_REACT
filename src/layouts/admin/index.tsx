
import { HeaderAdmin } from '../../components/header-admin'
import { SideBarAdmin } from '../../components/sidebar-admin'
import { Outlet } from 'react-router-dom'

export const LayoutAdmin = () => {
    return (
        <div>
            <HeaderAdmin />
            <div className='w-full h-[100vh] flex items-center'>
                <div className='w-[300px]'>
                    <SideBarAdmin />
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

import { useRoutes } from "react-router-dom";

import {Path} from '../contants/path'
import { Register } from '../pages/Register/Register'
import { Login } from '../pages/Login/Login'
import { Home } from '../pages/Home/Home'
import { MainLayout } from '../layouts/MainLayout'

export const route=()=>{
    const element=useRoutes([
        {
            path:Path.login,
            element:<MainLayout title='ad'><Login /></MainLayout>
        },
        {
            path:Path.register,
            element:<MainLayout title=''><Register /></MainLayout>
        },
        {
            path:Path.home,
            element:<MainLayout title=''><Home /></MainLayout>
        },

    ])
    return element
}
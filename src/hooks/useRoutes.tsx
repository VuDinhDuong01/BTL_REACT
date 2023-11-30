/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from "react-router-dom";

import {Path} from '../contants/path'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { MainLayout } from '../layouts/MainLayout'

export const route=()=>{
    const  element=useRoutes([
        {
            path:Path.login,
            element:<Login />
        },
        {
            path:Path.register,
            element:<Register />
        },
        {
            path:Path.home,
            element:<MainLayout title='Trang chủ'><Home /></MainLayout>
        },
    ])
    return element
}
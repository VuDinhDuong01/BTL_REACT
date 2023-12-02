/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from "react-router-dom";

import {PAGE} from '../contants/path'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { MainLayout } from '../layouts/MainLayout'

export const route=()=>{
    const  element=useRoutes([
        {
            path:PAGE.LOGIN,
            element:<Login />
        },
        {
            path:PAGE.REGISTER,
            element:<Register />
        },
        {
            path:PAGE.HOME,
            element:<MainLayout title='Trang chủ'><Home /></MainLayout>
        },
    ])
    return element
}
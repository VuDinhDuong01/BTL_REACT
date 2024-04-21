/* eslint-disable react-hooks/rules-of-hooks */
import { Routes, Route } from "react-router-dom";

import { PAGE } from '../constants/path'
import { Register } from '../pages/auth/register'

import { Login } from '../pages/auth/login'
import { Home } from '../pages/home'
import { MainLayout } from '../layouts/MainLayout'
import { RequestRole } from "../helps/request-role";
import { ROLE } from "../helps/roles";
import { ConfirmPassword } from "../pages/auth/confirm-email";
import { ConfirmCode } from "../pages/auth/confirm-code";
import { ResetPassword } from "../pages/auth/reset-password";
import { Personal } from "../pages/auth/me";
import Bookmark from "../pages/bookmark";
import { Message } from "../pages/message";
import { MessageDetail } from "../pages/message-detail";
import { TweetDetail } from "../pages/tweet-detail";
import Notifications from "../pages/notifications";
import { Communities } from "../pages/communities";
import  LayoutAdmin  from "../layouts/admin";

import { Admin } from "../pages/admin";
import { ContextAPI } from "./useContext";
import { useContext } from "react";
import AdminUser from "../pages/admin/admin-user";


export const route = () => {
    const { auth } = useContext(ContextAPI)
 
    return (
        <Routes>
            <Route path={PAGE.REGISTER} element={<Register />} />
            <Route path={PAGE.LOGIN} element={<Login />} />
            <Route path={PAGE.CONFIRM_PASSWORD} element={<ConfirmPassword />} />
            <Route path={PAGE.CONFIRM_CODE} element={<ConfirmCode />} />
            <Route path={PAGE.RESET_PASSWORD} element={<ResetPassword />} />

            <Route path={PAGE.HOME} element={auth === 'admin' ? <LayoutAdmin /> : <MainLayout />}>
                <Route element={<RequestRole allowRoles={[ROLE.USER]} />} >
                    <Route path={PAGE.HOME} element={<Home />} />
                    <Route path={PAGE.PERSONAL} element={<Personal />} />
                    <Route path={PAGE.BOOKMARK} element={<Bookmark />} />
                    <Route path={PAGE.MESSAGE} element={<Message />} />
                    <Route path={PAGE.MESSAGE_DETAIL} element={<MessageDetail />} />
                    <Route path={PAGE.NOTIFICATIONS} element={<Notifications />} />
                    <Route path={PAGE.COMMUNITIES} element={<Communities />} />
                </Route>
                <Route element={<RequestRole allowRoles={[ROLE.ADMIN]} />}>
                    <Route path={PAGE.ADMIN} element={<Admin />} />
                    <Route path={PAGE.USER} element={<AdminUser />} />
                </Route>
            </Route>

            <Route path={PAGE.TWEET_DETAIL} element={<TweetDetail />} />
        </Routes>
    )
}
/* eslint-disable react-hooks/rules-of-hooks */
import { Routes, Route } from "react-router-dom";

import { PAGE } from '../contants/path'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { MainLayout } from '../layouts/MainLayout'
import { RequestRole } from "../helps/RequestRole";
import { ROLE } from "../helps/roles";
// import { useContext } from "react";
// import { ContextAPI } from ".";

export const route = () => {
    // const { auth } = useContext(ContextAPI)
    // const ProtectedRouter = () => {
    //     auth ? <Navigate to={PAGE.HOME} /> : <Navigate to={PAGE.LOGIN} replace />
    // }

    // const UnProtected = () => {
    //     !auth ? <Navigate to={PAGE.LOGIN} replace /> : <Navigate to={PAGE.HOME} />
    // }

    return (
        <Routes>
            <Route path={PAGE.LOGIN} element={<Login />} />
            <Route path={PAGE.REGISTER} element={<Register />} />
            <Route path={PAGE.HOME} element={<MainLayout />}>
                <Route element={<RequestRole allowRoles={[ROLE.USER]} />} >
                    <Route path={PAGE.HOME} element={<Home />} />
                </Route>
            </Route>
        </Routes>
    )
}
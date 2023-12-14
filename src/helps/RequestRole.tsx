import { useContext } from "react"
import { ContextAPI } from "../hooks"
import { ROLE } from "./roles"
import { Outlet, Navigate } from "react-router-dom"
import { Missing } from "../pages/Missing/Missing"
import { PAGE } from "../contants"

export const RequestRole = ({ allowRoles }: { allowRoles: string[] }) => {
    const { auth } = useContext(ContextAPI)
    console.log(auth)
    return (
        <>
            {
                auth.auth && allowRoles.length && allowRoles.map(role => Object.values(ROLE).indexOf(role) > -1) ?
                    <Outlet /> :
                    auth.auth && !allowRoles.length ? <Missing /> : <Navigate to={PAGE.LOGIN} />
            }
        </>
    )
}

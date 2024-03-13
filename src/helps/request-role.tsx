
import { ROLE } from "./roles"
import { Outlet, Navigate } from "react-router-dom"
import { Missing } from "../pages/missing/Missing"
import { PAGE } from "../constants"
import { getAccessTokenToLS } from "."

export const RequestRole = ({ allowRoles }: { allowRoles: string[] }) => {
    const auth = Boolean(getAccessTokenToLS())
    return (
        <>
            {
                auth && allowRoles.length && allowRoles.map(role => Object.values(ROLE).indexOf(role) > -1) ?
                    <Outlet /> :
                    auth && !allowRoles.length ? <Missing /> : <Navigate to={PAGE.LOGIN} />
            }
        </>
    )
}

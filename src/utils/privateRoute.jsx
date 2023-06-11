import { Outlet, Navigate } from "react-router-dom";
import { getAuthCookie } from "./cookies";

export default function LoggedIn(){
    const token = getAuthCookie()
    return (token ? <Navigate to="/admin" replace /> : <Outlet/>)
}

export function LoggedOut(){
    const token = getAuthCookie()
    return (!token ? <Navigate to="/login" replace /> : <Outlet/>)
}

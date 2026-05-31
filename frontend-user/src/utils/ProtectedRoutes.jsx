import { Outlet, Navigate } from "react-router";
import { UserContext } from "@/context/UserContext";
import { UseUserAuth } from "@/hooks/UseUserAuth";
import { useContext } from "react";
import { Spinner } from "@/components/ui/spinner";


export const ProtectedRoutes = () => {
    UseUserAuth()
    const {user,loading} = useContext(UserContext)
     if(loading) {return <Spinner />}
     else{
        return user ? <Outlet/> : <Navigate to="/login"/>
     }
    
}
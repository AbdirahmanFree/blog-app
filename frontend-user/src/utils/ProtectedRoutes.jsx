import { Outlet, Navigate } from "react-router";
import { UserContext } from "@/context/UserContext";
import { UseUserAuth } from "@/hooks/UseUserAuth";
import { useContext, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";


export const ProtectedRoutes = () => {
    UseUserAuth()
    const {user,loading} = useContext(UserContext)

     console.log('Protected routes: ',loading,user)

     if(loading) {return <Spinner />}
     else{
        console.log("done loading")
        return user ? <Outlet/> : <Navigate to="/login"/>
     }
    
}
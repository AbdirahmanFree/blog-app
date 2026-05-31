import { UserContext } from "@/context/UserContext";
import axiosInstance from "@/utils/axiosInstance";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

export const UseUserAuth = () =>{
    const {user, updateUser, clearUser, loading, setLoading} = useContext(UserContext)

    


    useEffect(()=>{
        if (user) {
            setLoading(false);
            return;
        }
        
        let isMounted = true

        const fetchUserInfo = async () => {
            try {
                const userResponse = await axiosInstance.get("/api/user")
                const newUser = userResponse.data.user

                if (isMounted && newUser){
                    console.log("before updateUser", newUser);
                    updateUser(newUser)
                    console.log("after updateUser", newUser);
                }
                

            } catch(error){
                 console.error("Failed to fetch user info:", error)
                 if(isMounted){
                    clearUser()
                 }

            } finally{
                if(isMounted){
                    setLoading(false)
                }
                
            }
        }
        fetchUserInfo()

        return () => {
            isMounted = false
        }
    },[user])
}

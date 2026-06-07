import React, { useContext } from "react";
import NavBar from "@/components/NavBar";
import { UserContext } from "@/context/UserContext";

function Profile(){
    const {user} = useContext(UserContext)
    return(
    <>
        <h1 className="mx-8 my-4">{user.username}</h1>
        <button onClick={()=> {
            localStorage.clear() 
            window.location.reload()
            }} 
            className="bg-red-500 text-white ml-8 p-2 rounded-lg font-bold">LogOut</button>
    </>
    )
}

export default Profile
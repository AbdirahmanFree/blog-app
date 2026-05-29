import React, { useContext, useEffect, useState } from "react";
import { LoginForm } from "@/components/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { UserContext } from "@/context/UserContext";



function LogIn(){
  const { updateUser } = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

 

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosInstance.post("/api/log-in",{
        username: username,
        password: password
      })

      const token = response.data.token
      if(token){
        localStorage.setItem("token",token)
        const userRes = await axiosInstance.get("/api/user")
        const user = userRes.data.user
        updateUser(user)
        console.log("fetched from local storage",localStorage.getItem("token"))
      }
      else{
        console.log("incorrect login details")
      }
    } catch(error){
      console.error(error)
    }
      

  }
    return(
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Blog App
        </a>
        <LoginForm setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
    </div>
    )
}

export default LogIn
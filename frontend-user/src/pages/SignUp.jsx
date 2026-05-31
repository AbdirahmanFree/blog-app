import React, { useContext, useState} from "react";
import { SignupForm } from "@/components/signup-form";
import { passwordMatch, validatePassword, validateUsername } from "@/utils/utils";
import axiosInstance from "@/utils/axiosInstance";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router";


function SignUp(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const {updateUser} = useContext(UserContext)
    const navigate = useNavigate()

    async function handleSignUp(e){
        e.preventDefault()
        if(!validateUsername(username)){
            console.error("invalid username")
            return
        }
        if(!validatePassword(password)){
            console.error("invalid password")
            return
        }
        if(!passwordMatch(password,confirmPassword)){
            console.error("passwords do not match")
            return
        }
        try{
            const signUpResponse = await axiosInstance.post("/api/sign-up",{
                username: username,
                password: password
            })
            const token = signUpResponse.data.token
            if(token){
                localStorage.setItem("token",token)
                const userResponse = await axiosInstance.get("/api/user");
                const user = userResponse.data.user
                console.log(user)
                updateUser(user)
                navigate("/")
            }else{
                console.log("incorrect sign up details")
            }
 
        }catch(error){
            console.error(error)
        }

        
        

    }
    return(
    <>
       <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm setUsername={setUsername} setPassword={setPassword} setConfirmPassword={setConfirmPassword} handleSignUp={handleSignUp} />
      </div>
    </div>
    </>
    )
}

export default SignUp
import axiosInstance from "@/utils/axiosInstance"
import { useState } from "react"


function Input({id}){
    const [clicked, setClicked] = useState(false)
    const [comment, setComment] = useState("")

    

    const submit = async()=>{
        
        if(comment.length <= 0){
            console.log("enter a comment")
        }

        await axiosInstance.post(`/api/posts/${id}/comment`, {
            text:comment
        })
        console.log("created comment")
        setClicked(false)
        setComment("")
        window.location.reload();
        
    }


    return(
    <>
        {clicked ? (
            <div className="h-25 flex flex-col border-2 p-4 rounded-2xl">
                <input className=" border-none outline-none" placeholder="Join the conversation" onChange={(e)=>{setComment(e.target.value)}}/>
                <div className="flex flex-row items-end justify-end gap-2">
                    <button className="p-2 rounded-lg bg-gray-200" onClick={() => {setClicked(false)}}>Cancel</button>
                    <button className="p-2 rounded-lg bg-blue-400 " onClick={submit} >Comment</button>
                 
                </div>
            </div>
        ):(
            <div className="h-10 flex flex-col border-2 p-4 rounded-2xl justify-center" onClick={()=> {setClicked(true)}}>
                <h1>Join the conversation</h1>
            </div>
        )}
    </>
    )
}

export default Input
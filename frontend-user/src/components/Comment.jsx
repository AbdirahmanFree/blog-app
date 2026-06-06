import { useEffect, useState } from "react"


function Comment ({comment}){
    const [time,setTime] = useState("")
    useEffect(()=>{
        const dateCalculate = () => {
            const difference= Date.now() -new Date(comment.updated_at).getTime()
            const days = Math.floor(difference/ (1000 * 60 *60 *24))
            const hours = Math.floor(difference/(1000* 60 *60))
            const minutes = Math.floor(difference/(1000* 60))
            console.log('difference: ',difference)
            console.log('days: ',days)
            let date
            if(days >0){
                date = `${days} days ago`
            }
            else if (hours > 0){
                date = `${hours} hours ago `
            }
            else if(minutes >0){
                date = `${minutes} minutes ago`
            }
            else {
                date = 'now'
            }
            setTime(date)
            

        }
        dateCalculate()
    })
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
                <h1 className="text-lg text-black">{comment.user.username}</h1>
                <span  className="text-gray-500"> • </span>
                <span className="text-gray-500"> {time}</span>
            </div>
            <span className="pl-4">{comment.text}</span>
        </div>
    )
}

export default Comment
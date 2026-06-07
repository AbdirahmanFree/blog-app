import NavBar from "@/components/NavBar";
import { Spinner } from "@/components/ui/spinner";
import { UseUserAuth } from "@/hooks/useUserAuth";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Home(){
    UseUserAuth()
    const [posts,setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchPosts = async () => {
            const postRes = await axiosInstance.get("/api/posts")
            const formattedPosts = postRes.data.posts.map((post) => ({
                ...post,
                date: (new Date(post.updated_at)).toLocaleDateString("en-US",{month: "long", day: "numeric", year: "numeric"})
            }))
            
            setPosts(formattedPosts)
            setLoading(false)
            
        }
        fetchPosts()
    },[])


    

    return(
    <div className="flex flex-col m-0 gap-8 w-full">
        <NavBar/>
        { loading ? <Spinner/> : (posts.length > 0 ? (
            posts.map((post) => {
                return(<div key={post.id} className=" bg-gray-50 m-2 border-2 h-50 rounded-2xl flex flex-col p-4 gap-2 " onClick={()=> {navigate(`/posts/${post.id}`)}}>
                  
                        <div>
                            <h1 className="m-0 text-2xl">{post.title}</h1>
                            <span className="ml-4 text-gray-600">{post.user.username} • {post.date}</span>
                        </div>
                        <p className="p-4 text-gray-800 italic flex justify-center ">
                            {post.content.length > 50 ? `${post.content.slice(0,50)} \n Read More ... ` : post.content}
                        </p>
                    </div>)
                
            })
        ): (
            <div>No posts</div>
        ))}
    </div>
    )
}

export default Home
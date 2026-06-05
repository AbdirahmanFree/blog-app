import NavBar from "@/components/NavBar";
import { UseUserAuth } from "@/hooks/useUserAuth";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

function Home(){
    UseUserAuth()
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        const fetchPosts = async () => {
            const postRes = await axiosInstance.get("/api/posts")
            const postsArray = postRes.data.posts
            console.log(postsArray)
            postsArray.forEach(async (post)=>{
                const likedPostRes = await axiosInstance.get(`/api/posts/${post.id}/like`)
                const liked = likedPostRes.data
                const date = new Date(post.updated_at)
                const formatedDate = date.toLocaleDateString("en-US",{month: "long", day: "numeric", year: "numeric"})
                post.date = formatedDate
                post.liked = liked
                setPosts([...posts,post])
            })
        }
        fetchPosts()
    },[])

    

    return(
    <div className="flex flex-col m-0 gap-8 w-full">
        <NavBar/>
        {posts.length > 0 ? (
            posts.map((post) => {
                return(<div key={post.id} className=" bg-gray-50 m-2 border-2 h-50 rounded-2xl flex flex-col p-4 gap-2 ">
                    <div>
                        <h1 className="m-0 text-2xl">{post.title}</h1>
                        <span className="text-gray-600">{post.user.username} • {post.date}</span>
                    </div>
                    <p className="p-4 text-gray-800 italic flex justify-center ">
                        {post.content.length > 50 ? `${post.content.slice(0,50)} \n Read More ... ` : post.content}
                    </p>
                </div>)
            })
        ): (
            <div>No posts</div>
        )}
    </div>
    )
}

export default Home
import { useParams } from "react-router"
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { UseUserAuth } from "@/hooks/UseUserAuth";
import { Spinner } from "@/components/ui/spinner";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import Comment from "@/components/Comment";
import Input from "@/components/Input";
function BlogPost(){
    UseUserAuth()
    const {id} = useParams();
    const [post,setPost] = useState(null)
    const [loading,setLoading] = useState(true)
    const [liked,setLiked] = useState(false)
    const [likes,setLikes] = useState(0)
    const [comments, setComments] = useState([])

    useEffect( ()=> {
        const fetchPost = async() => {
            const postRes = await axiosInstance.get(`/api/posts/${id}`)
            const blogPost = postRes.data.post
            console.log(blogPost)
            const date = new Date(blogPost.updated_at)
            const formatedDate = date.toLocaleDateString("en-US",{month: "long", day: "numeric", year: "numeric"})
            blogPost.date = formatedDate
            const postLikeRes = await axiosInstance.get(`/api/posts/${id}/likes`)
            const numberLikesPost = postLikeRes.data
            const userLikedRes = await axiosInstance.get(`/api/posts/${id}/like`)
            const commentsRes = await axiosInstance.get(`/api/posts/${id}/comments`)
            setComments(commentsRes.data.comments)
            setLiked(userLikedRes.data)
            setPost(blogPost)
            setLoading(false)
            setLikes(numberLikesPost)
        }
        fetchPost()
       
    },[])

    const likePost = async () => {
        await axiosInstance.post(`/api/posts/${id}/like`)
        if(liked){
            setLikes(likes-1)
            setLiked(false)
        }
        else{
            setLikes(likes+1)
            setLiked(true)
        }
    }
    return (
        <div className="flex flex-col min-h-screen" >
            <NavBar/>
            {loading ? <Spinner/> : (
                <div className="bg-gray-50 rounded-2xl m-8 min-h-50 p-8 flex flex-col gap-4 drop-shadow-gray-200">
                    <div className="">
                        <div>
                             <h1 className="m-0 text-2xl">{post.title}</h1>
                              <span className="ml-4 text-gray-600">{post.user.username} • {post.date}</span>
                        </div>
                        <p className="p-4 justify-center mb-8">{post.content}</p>
        
                    </div>
                    <div className="flex flex-row items-center gap-4">
                            <div className="flex flex-row items-center gap-1" onClick={likePost}>{liked ?  (<FaThumbsUp/>) : (<FaRegThumbsUp/>) }
                                <div className="font-semibold">{likes}</div>
                            </div>
                             
                             <div className="flex flex-row items-center gap-1">
                                <LuMessageCircle/>
                                <div className="font-semibold">{comments.length}</div>
                             </div>
            
                        </div>
                    
                    <div className="flex flex-col gap-4 border-t-0 mt-16  p-4">
                        <Input id={id}/>
                        {comments.map((comment) =>{
                            return (
                            <div id={comment.id}>
                                <Comment comment={comment}/>
                            </div>)
                        })}
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default BlogPost
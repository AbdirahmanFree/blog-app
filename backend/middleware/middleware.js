import prisma from "../models/prisma.js"
import * as passwordUtils from "../utlis/password.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


const signUp = async (req,res,next)=>{
    const hashedPassword = await passwordUtils.hashPassword(req.body.password);
    const username = req.body.username;
    const role = req.body.role || 'user';
    try{
        const user = await prisma.user.create({
            data:{
                username: username,
                hashed_password: hashedPassword,
                role: role
            }
        });
        next();
        
    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Sign in failed"
        })
    }
    
}

const logIn = async(req,res) => {
    const user = await prisma.user.findUnique({
        where:{
            username: req.body.username
        }
    })
    if(user == null){
        res.status(404).json({
            message: "user not found"
        })
    } 
    else{
        const match = await passwordUtils.comparePasswords(req.body.password,user.hashed_password)
        if(match){
            jwt.sign({id: user.id, role: user.role},process.env["SECERET_KEY"],{expiresIn: '1d'}, function(err,token){
                if(err){
                    res.status(500).json({
                        message: "Internal server cannot sign jwt token"
                    })
                }
                else{
                    res.status(200).json({
                        token: token,
                    })
                }
            })
        }
        else{
            res.status(404).json({
                message: "password does not match"
            })
        }
    }
}

const getPosts = async (req,res) =>{
    const posts = await prisma.post.findMany({
        where: {
            published: true
        }
    });
    res.json({
        posts: posts
    })
}

const getPost = async (req,res) => {
    const post = await prisma.post.findUnique({
        where:{
            id: req.params.postId
        }
        
    });
    res.json(post)
}

const createPost = async(req,res) => {
    const userId = req.userId
    const role = req.userRole
    if(role =="user"){
        res.sendStatus(403)
    }
    else{
        const title = req.body.title
        const content = req.body.content || ""
        const published = req.body.published || false
        const post = await prisma.post.create({
            data:{
                user_id: userId,
                title: title,
                content: content,
                published: published
            }
        })
        res.json(post)

    }
}

const getComments = async(req,res) => {
    const comments = await prisma.comment.findMany();
    res.json({comments})
}

const getComment = async(req,res) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: req.params.commentId
        }
    })
    res.json({comment})
}

const createComment = async (req,res) => {
    const userId = req.userId
    const postId = req.params.postId
    const text = req.body.text
    console.log(userId)
    console.log(postId)
    try{
        const comment = await prisma.comment.create({
        data: {
            user_id: userId,
            post_id: postId,
            text: text,
        }
    })
    res.json(comment)
    } catch(error){
        console.log(error)
        res.status(500).json({
            message: "Error creating comment"
        })
    }
    
}

const togglePostLike = async (req,res) => {
    const userId = req.userId
    const postId = req.params.postId
    const postLike = await prisma.postLike.findMany({
        where: {
            user_id: userId,
            post_id: postId
        }
    })
    const { likes } = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
    if(postLike.length > 0){
        const newLikesCount = Math.max(likes-1,0);
        const deletedPostLike = await prisma.postLike.delete({
            where:{
                id: postLike[0].id,
                user_id: userId,
                post_id: postId
            }
        })
        
    
        const newPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likes: newLikesCount
            }
    })
        res.json({
            message:"Removed like",
            post_like: deletedPostLike 
        })
    }
    else{
        const newLikesCount = likes +1;
        const postLike = await prisma.postLike.create({
            data:{
                user_id: userId,
                post_id: postId
            }
        })

        const newPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likes: newLikesCount
            }
        })
        res.json({
            message: "Added like",
            post_like: postLike
        })     
    }
    
}

const toggleCommentLike = async (req,res) => {
    const userId = req.userId
    const commentId = req.params.commentId
    const commentLike = await prisma.commentLike.findMany({
        where: {
            user_id: userId,
            comment_id: commentId,
        }
    })
    const { likes } = await prisma.comment.findUnique({
            where: {
                id: commentId
            }
        })
    if(commentLike.length > 0){
        const newLikesCount = Math.max(likes-1,0);
        const deletedCommentLike = await prisma.commentLike.delete({
            where:{
                id: commentLike[0].id,
                user_id: userId,
                comment_id: commentId
            }
        })
        
    
        const newPost = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                likes: newLikesCount
            }
    })
        res.json({
            message:"Removed like",
            comment_like: deletedCommentLike 
        })
    }
    else{
        const newLikesCount = likes +1;
        const commentLike = await prisma.commentLike.create({
            data:{
                user_id: userId,
                comment_id: commentId
            }
        })

        const newComment = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                likes: newLikesCount
            }
        })
        res.json({
            message: "Added like",
            comment_like: commentLike
        })     
    }
    
}


const verifyToken = async (req,res,next) => {
    const bearerHeader= req.headers['authorization']
    if(typeof bearerHeader =="undefined"){
        res.sendStatus(403)
    }
    else{
        const bearerToken = bearerHeader.split(' ')[1]
        jwt.verify(bearerToken,process.env["SECERET_KEY"],function(err,decoded){
            req.userId = decoded.id
            req.userRole = decoded.role
        })
        next()
    }
}


export {
    getPosts,
    signUp,
    logIn,
    verifyToken,
    createPost,
    createComment,
    togglePostLike,
    toggleCommentLike,
    getPost,
    getComment,
    getComments
}
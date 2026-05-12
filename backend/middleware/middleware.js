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
    console.log(req.userId)
    console.log(req.userRole)
    const posts = await prisma.post.findMany({
        where: {
            published: true
        }
    });
    res.json({
        posts: posts
    })
}

const createPost = async(req,res) => {
    const userId = req.userId
    const role = req.userRole
    console.log(role)
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
    createPost
}
import { Router }from "express"
import * as controller from "../middleware/middleware.js"
const router = Router();

//front end routes



router.get("/api/posts",controller.verifyToken,controller.getPosts)

router.get("/api/posts/:postId",(req,res) =>{
    res.json(`get post with id ${req.params.postId}`)
})

router.get("/api/posts/:postId/comments",(req,res) => {
    res.json(`get comments under post with id ${req.params.postId}`)
})

router.get("/api/users",(req,res) => {
    res.json('get users')
})
router.post("/api/sign-up",controller.signUp,controller.logIn)

router.post("/api/log-in",controller.logIn)

router.post("/api/posts",controller.verifyToken,controller.createPost)

router.post("/api/posts/:postId",(req,res) => {
  
})

router.post("/api/posts/:postId",controller.verifyToken,controller.toggle)


function verifyUser(req,res,next){
    next()
}

function verifyAdmin(req,res,next){
    next()
}
export default router
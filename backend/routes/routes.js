import { Router }from "express"
import * as controller from "../middleware/middleware.js"
const router = Router();

router.get("/api/posts",controller.verifyToken,controller.getPosts)

router.get("/api/posts/:postId",controller.verifyToken,controller.getPost)

router.get("/api/comments",controller.verifyToken,controller.getComments)

router.get("/api/comments/:commentId",controller.verifyToken,controller.getComment)

router.post("/api/sign-up",controller.signUp,controller.logIn)

router.post("/api/log-in",controller.logIn)

router.post("/api/posts/post",controller.verifyToken,controller.createPost)

router.post("/api/posts/:postId/comment",controller.verifyToken,controller.createComment)

router.post("/api/posts/:postId/like",controller.verifyToken,controller.togglePostLike)

router.post("/api/comments/:postId/:commentId/like",controller.verifyToken,controller.toggleCommentLike)


function verifyUser(req,res,next){
    next()
}

function verifyAdmin(req,res,next){
    next()
}
export default router
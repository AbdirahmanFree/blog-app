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

router.put("/api/posts/:postId",controller.verifyToken,controller.updatePost)

router.get("/api/admin/posts",controller.verifyToken,controller.getAdminPosts)

router.put("/api/comments/:commentId",controller.verifyToken,controller.updateComment)

router.get("/api/user",controller.verifyToken,controller.getUser)

router.delete("/api/comments/:commentId",controller.verifyToken,controller.deleteComment)

router.delete("/api/posts/:postId",controller.verifyToken,controller.deletePost)

router.delete("/api/user",controller.verifyToken,controller.deleteUser)



export default router
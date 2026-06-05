import { Router }from "express"
import * as controller from "../middleware/middleware.js"
const router = Router();

// (blog) post routes
router.get("/api/posts",controller.verifyToken,controller.getPosts)
router.get("/api/posts/:postId",controller.verifyToken,controller.getPost)
router.post("/api/posts/post",controller.verifyToken,controller.createPost)
router.put("/api/posts/:postId",controller.verifyToken,controller.updatePost)
router.get("/api/admin/posts",controller.verifyToken,controller.getAdminPosts)
router.delete("/api/posts/:postId",controller.verifyToken,controller.deletePost)

// (blog) auth routes
router.post("/api/log-in",controller.logIn)
router.post("/api/sign-up",controller.signUp,controller.logIn)

// (blog) comment routes
router.get("/api/comments",controller.verifyToken,controller.getComments)
router.get("/api/comments/:commentId",controller.verifyToken,controller.getComment)
router.post("/api/posts/:postId/comment",controller.verifyToken,controller.createComment)
router.put("/api/comments/:commentId",controller.verifyToken,controller.updateComment)
router.delete("/api/comments/:commentId",controller.verifyToken,controller.deleteComment)

// (blog) like routes
router.post("/api/posts/:postId/like",controller.verifyToken,controller.togglePostLike)
router.post("/api/comments/:postId/:commentId/like",controller.verifyToken,controller.toggleCommentLike)
router.get("/api/posts/:postId/like",controller.verifyToken, controller.getPostLike)
router.get("/api/comments/:postId/:commentId/like",controller.verifyToken, controller.getCommentLike)

// (blog) 
router.get("/api/user",controller.verifyToken,controller.getUser)
router.delete("/api/user",controller.verifyToken,controller.deleteUser)





export default router
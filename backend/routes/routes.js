import { Router }from "express"
const router = Router();

//front end routes
router.get("/home",(req,res) => {
    res.json('Welcome to the home page browse and give your reactions to different blog posts!')
})

router.get("/admin/home",verifyAdmin,(req,res) => {
    res.json('Admin page create read update and destroy blog posts ')
})


router.get("/api/posts",(req,res) => {
    res.json('Get all posts')
})

router.get("/api/posts/:postId",(req,res) =>{
    res.json(`get post with id ${req.params.postId}`)
})

router.get("/api/posts/:postId/comments",(req,res) => {
    res.json(`get comments under post with id ${req.params.postId}`)
})

router.get("/api/users",(req,res) => {
    res.json('get users')
})
router.post("/api/sign-up",(req,res) => {
    //add too database do validation checks and what not
    console.log(req.body)
    res.json('sign up')
})

router.post("/api/log-in",(req,res) =>{
    // sign jwt token jwt token and send back to user
})

router.post("/api/posts/:postId",(req,res) => {
    // create posts
})

router.post("/api/posts/:postID/:commentId",(req,res) => {
    // create comments
})


function verifyUser(req,res,next){
    next()
}

function verifyAdmin(req,res,next){
    next()
}
export default router
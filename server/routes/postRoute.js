const { Router } = require("express")
const { createPost, getPost, deletePost, postPopulation, getComments } = require("../controllers/postControl")
const postModel = require("../database/schema/postModel")
const postRoute = Router()

postRoute.post('/createPost', createPost)
postRoute.get('/findPost', getPost)
postRoute.delete('/deletePost', deletePost)
postRoute.get("/posts", async(req, res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader;
    if(token) res.json({ message: "no authentication"})
    console.log(token)
    try {
        const posts = await postModel.find().populate('UserId', 'profileImage username')
        res.send(posts)
    } catch (error){
        res.send(error)
    }
})

postRoute.post("/posts/:postId", postPopulation)


module.exports = postRoute
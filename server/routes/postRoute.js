const { Router } = require("express")
const { createPost, getPost, deletePost, postPopulation, getComments } = require("../controllers/postControl")
const postModel = require("../database/schema/postModel")
const postRoute = Router()

postRoute.post('/createPost', createPost)
postRoute.get('/findPost', getPost)
postRoute.delete('/deletePost', deletePost)
postRoute.get("/posts", async(req, res) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1];
    if(!token) res.json({ message: "Nothing in header"})
    console.log(token)
    try {
        const posts = await postModel.find().populate('UserId', 'profileImage username')
        res.send(posts)
    } catch (error){
        res.send(error)
    }
})

postRoute.get("/posts/:postId", postPopulation)


module.exports = postRoute
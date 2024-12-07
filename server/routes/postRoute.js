const { Router } = require("express")
const { createPost, getPost, deletePost } = require("../controllers/postControl")
const postModel = require("../database/schema/postModel")
const postRoute = Router()

postRoute.post('/createPost', createPost)
postRoute.get('/findPost', getPost)
postRoute.delete('/deletePost', deletePost)
postRoute.get("/posts", async(req, res) => {
    try {
        const posts = await postModel.find();
        res.send(posts)
    } catch (error){
        res.send(error)
    }
})

module.exports = postRoute
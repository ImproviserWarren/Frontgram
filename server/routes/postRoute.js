const { Router } = require("express")
const { createPost, getPost, deletePost } = require("../controllers/postControl")

const postRoute = Router()

postRoute.post('/createPost', createPost)
postRoute.get('/findPost', getPost)
postRoute.delete('/deletePost', deletePost)

module.exports = postRoute
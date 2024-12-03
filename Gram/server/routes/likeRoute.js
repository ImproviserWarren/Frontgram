const { Router } = require("express")
const likePost = require("../controllers/likeController")

const likeRoute = Router()

likeRoute.put('/likePost', likePost)


module.exports = likeRoute
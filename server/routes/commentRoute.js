const { Router } = require("express")
const createComment = require("../controllers/commentController")

const commentRoute = Router()

commentRoute.post('/createComment', createComment)

module.exports = commentRoute
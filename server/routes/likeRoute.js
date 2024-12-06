const { Router } = require("express")
const likePost = require("../controllers/likeController")

const likeRoute = Router()

likeRoute.put('/likePost', likePost)
likeRoute.get('/users', (req, res) => {
    const body = req.body;
    res.send(body)
})


module.exports = likeRoute
const { Router } = require("express");
const { createUser, loginUser, validateEmail, getUserWPost, followUser, userAuthentication } = require("../controllers/userControl");
const userModel = require("../database/schema/userModel")

const userRoute = Router();

userRoute.post('/signUp', validateEmail, createUser)
userRoute.post('/login', userAuthentication, loginUser)
userRoute.get('/findUserPost', getUserWPost)
userRoute.post('/followUser', followUser)
userRoute.get('/users', async (req, res) => {
    try {
    const users = await userModel.find()
    res.send(users)

    } catch (error) {
        res.send(error)
    }

})

module.exports = userRoute 
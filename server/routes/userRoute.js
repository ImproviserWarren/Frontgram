const { Router } = require("express");
const { createUser, loginUser, validateEmail, getUserWPost, followUser, userAuthentication } = require("../controllers/userControl");
const userModel = require("../database/schema/userModel")


const userRoute = Router();

userRoute.post('/signUp', validateEmail, createUser)
userRoute.post('/login', loginUser)
userRoute.get('/findUserPost', getUserWPost)
userRoute.post('/followUser', followUser)
userRoute.get('/users', async (req, res) => {
    try {
    const users = await userModel.find()
    const token = localStorage.getItem("authToken");
    res.send(users, token)
    } catch (error) {
        res.send(error)
    }

})
userRoute.get('/data', userAuthentication, async (req, res) => {
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if(err){
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to  route');
        }
    })
})

module.exports = userRoute 
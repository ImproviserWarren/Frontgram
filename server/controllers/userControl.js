const userModel = require("../database/schema/userModel")
const factModel = require("../database/schema/postModel")
const bcrypt = require('bcrypt');

 
const createUser = async (req, res) => {
    const userData = req.body
    console.log(userData)
    const saltRounds = 10;
    const password = userData.password
    const hash = bcrypt.hashSync(password, saltRounds)
    console.log('password', password)
    console.log('hashedPassword', hash)

    const data = { ...userData, password: hash }
    try {
        await userModel.create(data)
        res.status(200).send({ message: 'user created' })
    } catch (error) {
        res.status(500).send(error)
    }
}
 
 
const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await userModel.findOne({ email: email })
        const hashedPassword = user.password
        const isUser = bcrypt.compareSync(password, hashedPassword)
        if (isUser) {
            res.status(200).send({ message: "Sucessfully logged in" })
        } else {
            res.status(404).send({ message: "check password or email" })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const validateEmail = async(req, res, next) => {
    const userData = req.body;
    const user = await userModel.findOne({ email: userData.email })
    if (!user) {
        next()
    } else {
        res.status(403).send({ message: 'Email is taken' })
    }
}

const getUserWPost = async(req, res) => {
    try {
       const post = await userModel.find().populate("posts", "postImg caption")
    res.status(200).send(post)
    } catch (error) {
        res.send(error)
    }
}

const followUser = async (req, res) => {
    const { followingUserId, followedUserId } = req.body
    try {
        await userModel.findByIdAndUpdate(followingUserId, {
            $addToSet: {
                following: followingUserId
            },
        });
        await userModel.findByIdAndUpdate(followedUserId, {
            $addToSet: {
                followers: followedUserId
            }
        })
        res.status(200).json("done")
    } catch (error) {
        throw new Error(error)
    }
}


 
module.exports = { createUser, loginUser, validateEmail, getUserWPost, followUser }
 
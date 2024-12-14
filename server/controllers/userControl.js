const userModel = require("../database/schema/userModel")
const factModel = require("../database/schema/postModel")
const bcrypt = require('bcrypt');

require('dotenv').config()

 
const createUser = async (req, res) => {
    const { username, email, password } =req.body
    const saltRounds = 10;
    try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    });
    const token = jwt.sign({
        UserId: createdUser._id,
        username: createdUser.username
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);
      res.send({ token })
    } catch (error) {
        res.json({ message: "bad "})
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
 
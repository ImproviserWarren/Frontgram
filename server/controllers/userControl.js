const userModel = require("../database/schema/userModel")
const factModel = require("../database/schema/postModel")
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken')


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
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "Check email or password" });
        }
        const isUser = await bcrypt.compare(password, user.password);
        if (isUser) {
            const token = jwt.sign({
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' });
            return res.status(200).send({ message: "Logged in", token });
        } else {
            return res.status(404).send({ message: "Check password or email" });
        }
    } catch (error) {
        return res.status(404).send(error);
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



const userAuthentication = (req, res, next) => {
    jwt.verify(req.token, 'privatekey', (error,verifiedData) => {
        if(error){
            console.log("bad")
        } else {
            res.json({message: "Nice", verifiedData})
        }
    })
}

// const verifiedOutput = (req, res) => {
//     jwt.verify(req.token, 'privatekey', (error,verifiedData) => {
//         if(error){
//             console.log("bad")
//         } else {
//             res.json({message: "Nice", verifiedData})
//         }
//     })
// }

 
module.exports = { createUser, loginUser, validateEmail, getUserWPost, followUser, userAuthentication }
 
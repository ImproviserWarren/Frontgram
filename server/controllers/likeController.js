const likeModel = require("../database/schema/likesModel")
const likePost = async (req, res) => {
    const { likedPost, postLiker } = req.body
    try {
        await likeModel.findOneAndUpdate(postLiker, {
            $addToSet: {
                postId: postLiker
            },
        })
        await likeModel.findOneAndUpdate(likedPost, {
            $addToSet: {
                likes: postLiker
            }
        })
        res.status(200).json("done")
    } catch (error){
        throw new Error(error)
    }
}


module.exports = likePost

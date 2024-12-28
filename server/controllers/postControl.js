const postModel = require("../database/schema/postModel")
 
const createPost = async (req, res) => {
    const body = req.body
    try {
        const fact = await postModel.create(body)
        res.status(200).send(fact)
    } catch (e) {
        console.log(e)
    }
}
 
const getPost = async (req, res) => {
    try {
        const fact = await postModel.find().populate('UserId', 'profileImage username')
        res.status(200).send(fact)
        console.log(fact)
    } catch (error) {
        console.log(error)
    }
}

const getComments = async (req, res) => {
    try {
        const fact =  await postModel.find().populate('UserId', 'profileImage username comments')
        res.status(200).send(fact)
    } catch (error) {
        res.send("Done")
    }
}

const postPopulation = async (req, res) => {
    try {
        const { postId } = req.query; 
        const response = await postModel.findById(postId).populate({
            path: "Comments",
            populate: {
                UserId: "UserId",
                select: "username profileImage"
            }
        });
        if (!response){
            return res.status(404).json({ Error: "SOmething"})
        }
        res.send(response)
    } catch (error){
        res.status(404).json({ error: "Some error"})
    }
}
 
 
const deletePost = async (req, res) => {
    const factId = req.params.factId
    try {
        const result = await postModel.findByIdAndDelete(factId)
        console.log(result)
        res.status(200).send(`${result._id} Deleted`)
    } catch (error) {
        console.log(error)
    }
}

 
module.exports = { createPost, getPost, deletePost, postPopulation, getComments }
 
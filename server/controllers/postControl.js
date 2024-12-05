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
        const fact = await postModel.find({})
        res.status(200).send(fact)
    } catch (error) {
        console.log(error)
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

 
module.exports = { createPost, getPost, deletePost }
 
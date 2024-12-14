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

const postPopulation = async (req, res) => {
    try {
        const { postId } = req.query; // Get postId from query
        if (!postId) return res.status(400).json({ error: "Post ID is required" });

        const response = await postModel.findById(postId).populate({
            path: "Comments",
            populate: { path: "UserId", select: "username profileImage" }
        });

        if (!response) return res.status(404).json({ error: "Post not found" });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

 
 
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

 
module.exports = { createPost, getPost, deletePost, postPopulation }
 
const commentModel = require("../database/schema/commentModel")

const createComment = async (req, res) => {
    const body = req.body;
    try {
        const comment =  await commentModel.create(body)
        res.status(200).send(comment)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = createComment
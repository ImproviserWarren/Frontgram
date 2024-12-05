const { mongoose, Schema } = require('mongoose')

const likeSchema = new Schema({
    UserId: [{ type: Schema.Types.ObjectId, ref: 'users'}],
    postId: [{ type: Schema.Types.ObjectId, ref: "post"}]
})

const likeModel = mongoose.model('likes', likeSchema)

module.exports = likeModel
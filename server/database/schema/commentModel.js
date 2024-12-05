const { mongoose, Schema } = require('mongoose')

const commentSchema = new Schema({
    UserId: [{ type: Schema.Types.ObjectId, ref: 'users'}],
    postId: [{ type: Schema.Types.ObjectId, ref: 'post'}],
    comment: String,
})

const comment = mongoose.model('comments', commentSchema)

module.exports = comment
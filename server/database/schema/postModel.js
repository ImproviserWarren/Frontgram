const { mongoose, Schema } = require('mongoose')
 
const postSchema = new Schema({
    UserId: [{ type: Schema.Types.ObjectId, ref: 'users'}],
    postImg: String,
    postId: String,
    caption: String,
    likes: {type: Array, default:[]},
    comments: [{ type: Schema.Types.ObjectId, ref: 'comments'}]
 
})
 
const postModel = mongoose.model('posts', postSchema)
 
module.exports = postModel
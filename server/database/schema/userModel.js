const { mongoose, Schema } = require('mongoose')
 
const userSchema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    username: { type: String, required: true},
    profileImage: { type: String },
    bio: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: "Users"}],
    following: [{ type: Schema.Types.ObjectId, ref: "Users"}]
},
{ timestamps: true }
)
 
const userModel = mongoose.model('users', userSchema)
 
module.exports = userModel
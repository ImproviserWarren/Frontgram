const { mongoose, Schema } = require('mongoose')
 
const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    username: { type: String, required: true, unique: true},
    profileImage: { type: String },
    bio: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: "users"}],
    following: [{ type: Schema.Types.ObjectId, ref: "users"}]
},
{ timestamps: true }
)
 
const userModel = mongoose.model('users', userSchema)
 
module.exports = userModel
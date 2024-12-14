const express = require('express')
const cors = require('cors')
const connectDatabase = require('./utils/connectToDb.js')
const cloudinary = require('cloudinary')
const postRoute = require('./routes/postRoute.js')
const userRoute = require('./routes/userRoute.js')
const commentRoute = require("./routes/commentRoute.js")
const likePost = require("./routes/likeRoute.js")

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = 8080
 
const app = express()
app.use(express.json())
app.use(cors())

app.use(userRoute);
app.use(postRoute)
app.use(commentRoute)
app.use(likePost)





connectDatabase()

app.listen(PORT,() => {
    console.log(`Console log ${PORT}`)
})
 
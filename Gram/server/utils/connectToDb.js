const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectToDb = async () => {
    try {
        res = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to the database")  
    } catch (error) {
        console.log(error)
    }
    
} 

module.exports = connectToDb
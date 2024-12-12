import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

if(!process.env.MONGO_DB_URL){
    throw new Error("Please provide MONGO_DB URL in the .env file");
    
}

const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Database connected")
    } catch (error) {
        console.log("MongoDB connection erro", error)
    }
}
export default connectToDB
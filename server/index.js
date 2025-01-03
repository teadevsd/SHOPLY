import express from "express";
import cors  from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import helmet from "helmet"
import connectToDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));

connectToDB()
const Port = 4040 || process.env.Port

app.get("/", (request, response)=>{
    response.json({
        message: "Server is running " + Port 
    })
})

app.use('/api/v1/user', userRouter)

app.listen(Port, ()=>{
    console.log("App is running and active on port:", Port)
})

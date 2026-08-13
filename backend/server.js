import 'dotenv/config'
import './utils/reminderCron.js'
import express from 'express'
import cors from 'cors'
import { Router } from 'express';
import userRouter from './router/userRouter.js'
import studentmodel from './database/student.js';
import dbconnect from './database/db.js';
import { taskRouter } from './router/taskRouter.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import path from 'path'
const PORT=process.env.PORT || 3000;
const app=express();
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL ,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))
app.use("/api",userRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api",taskRouter)
dbconnect();
app.listen(PORT,"0.0.0.0",()=>{
    console.log("Server Running")
})

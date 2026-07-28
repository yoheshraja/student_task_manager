import express from 'express'
import cors from 'cors'
import { Router } from 'express';
import userRouter from './router/userRouter.js'
import studentmodel from './database/student.js';
import dbconnect from './database/db.js';
import { taskRouter } from './router/taskRouter.js';
import dotenv from 'dotenv'
import { authMiddleware } from './middlewares/authMiddleware.js';
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors())
app.use("/api",userRouter);
app.use("/uploads",express.static("uploads"));
app.use("/api",taskRouter)
dbconnect();
app.listen(3000,()=>{
    console.log("Server Running")
})

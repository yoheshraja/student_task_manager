import { Router } from "express";
import express from 'express'
import{ taskController,updateController,deleteTask} from "../controller/taskController.js";
import gettask from '../controller/gettask.js'
import { authMiddleware } from "../middlewares/authMiddleware.js";
export const taskRouter=express.Router();
taskRouter.post("/tasks",authMiddleware,taskController);
taskRouter.put("/tasks/update/:id",authMiddleware,updateController)
taskRouter.delete("/tasks/delete/:id",authMiddleware,deleteTask)
taskRouter.get("/tasks",authMiddleware,gettask)
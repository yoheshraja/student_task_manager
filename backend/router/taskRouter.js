import { Router } from "express";
import express from 'express'
import{ taskController,updateController,deleteTask} from "../controller/taskController.js";
import gettask from '../controller/gettask.js'
import { authMiddleware } from "../middlewares/authMiddleware.js";
import{ searchController} from '../controller/searchController.js'
export const taskRouter=express.Router();
taskRouter.post("/tasks",authMiddleware,taskController);
taskRouter.get("/tasks/",authMiddleware,gettask)
taskRouter.put("/tasks/update/:id",authMiddleware,updateController)
taskRouter.delete("/tasks/delete/:id",authMiddleware,deleteTask)
taskRouter.get("/tasks/search",authMiddleware,searchController)
import { Router } from "express";
import express from 'express'
import regcontrol from "../controller/regcontrol.js"
import logcontrol from "../controller/logcontrol.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {profileControl,getprofile }from "../controller/profileControl.js"
import upload from "../middlewares/upload.js";
 const userRouter=express.Router();
 userRouter.post("/register",regcontrol);
 userRouter.post("/login",logcontrol)
 userRouter.post("/profile",authMiddleware,upload.single("image"),profileControl)
 userRouter.get("/profile/me",authMiddleware,getprofile)
//  userRouter.get("/dashboard")

 export default userRouter
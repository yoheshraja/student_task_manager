import taskModel from "../database/task.js"
import { Router } from "express";
const gettask=async(req,res)=>{
   try {
    //  const pagination=req.query;
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const totalTask=await taskModel.countDocuments({userId:req.stud.id});
    const skip=(page-1)*limit;
    const getTask=await taskModel.find({userId:req.stud.id}).sort({dueDate:1}).skip(skip).limit(limit);
    const totalPage=Math.ceil(totalTask/limit);
    const previous=page>1;
    const next=page<totalPage;
    res.status(200).json({
        success:true,
        totalPage,totalTask,previous,next,getTask,page
    })
   } catch (error) {
    res.status(500).json({
        success:false,
        message:"server error"
    })
   }

}
export default gettask
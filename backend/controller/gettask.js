import taskModel from "../database/task.js"
import { Router } from "express";
const gettask=async(req,res)=>{
   try {
    //  const pagination=req.query;
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const {search,sort,filter}=req.query;
    const skip=(page-1)*limit;
    const query={userId:req.stud.id}
    if(search){
    query.title={$regex:search,$options:"i"}
   }
   if(filter){
    query.priority=filter;
   }
  
   let sortoption={};
    switch (sort) {
        case "asc":
            sortoption={dueDate:1}
            break;
        case "desc":
            sortoption={dueDate:-1}
            break;
        default:
            sortoption={dueDate:1}
            break;
    }
    const totalTask=await taskModel.countDocuments(query);
    const getTask=await taskModel.find(query).sort(sortoption).skip(skip).limit(limit);
    const totalPage=Math.ceil(totalTask/limit);
    
    const previous=page>1;
    const next=page<totalPage;
    if (!getTask) {
        res.status(404).json({
            success:false,
            message:"can't get task"
        })
    }
    // if(getTask.length===0){
    //     return res.status(404).json({
    //     success:false,
    //     message:"Task Not Found"
    // })
    // }
    res.status(200).json({
        success:true,
        totalPage,totalTask,previous,next,getTask,page,
    })
   } catch (error) {
    res.status(500).json({
        success:false,
        message:"server error"
    })
   }

}
export default gettask
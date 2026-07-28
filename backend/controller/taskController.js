import taskModel from '../database/task.js'
export const taskController=async(req,res)=>{
    const {title,description,dueDate,priority}=req.body;
    try {
        if (!title || !description || !dueDate || !priority) {
            return res.status(401).json({
                success:false,
                message:"Fill All Fields"
            })
        }
        const saveTask=new taskModel({
            title:title,
            description:description,
            dueDate:dueDate,
            priority:priority,
            userId:req.stud.id
        })
        await saveTask.save();
        res.status(201).json({
            success:true,
            message:"task created",
            saveTask
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}

export const updateController=async(req,res)=>{
    const {title,description,dueDate,priority}=req.body; //how to handle many data in this line
    const id=req.params.id;                             //why not use the middleware payload
    const updatedData=await taskModel.findByIdAndUpdate(id,{
        title:title,
        description:description,
        dueDate:dueDate,
        priority:priority
    },{new:true}) 
    res.json({
        success:true,
        message:"task updated successfully",
        updatedData
    })
}   

export const deleteTask=async(req,res)=>{
    try{
    const id=req.params.id
    const Taskdel=await taskModel.findByIdAndDelete(id);
    if (!Taskdel) {
        res.status(404).json({
        success:true,
        message:"task not found",
        })
    }
    res.status(200).json({
        success:true,
        message:"task deleted successfully"
    })
}catch(e){
   return res.status(500).json({
        success:true,
        message:"server error"
    })
}
}
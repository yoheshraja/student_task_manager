import mongoose, { Types } from 'mongoose'

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    dueDate:{
        type:Date,
    },
    priority:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
})
const taskModel=mongoose.model("Task",taskSchema);
export default taskModel
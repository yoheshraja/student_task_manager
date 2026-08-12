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
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    },
    remainderSent:{
        type:[Number],
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
})
const taskModel=mongoose.model("Task",taskSchema);
export default taskModel
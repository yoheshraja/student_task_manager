import mongoose, { Model, model } from 'mongoose'
const studentSchema=mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true  
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
    profileCompleted:{
        type:Boolean,
        default:false
    },
    studentprofile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    }
})
const studentmodel=mongoose.model("Student",studentSchema)
export default studentmodel
import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    profileImage:{
        type:String,
        default:""
    },
    age:{
        type:Number
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    }
})
export const profileModel=mongoose.model("Profile",profileSchema)
import studentmodel from "../database/student.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const logcontrol=async(req,res)=>{
    try {
        const {email,password}=req.body;
    const stud=await studentmodel.findOne({email});
    if (!stud) {
       return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }
    const match=await bcrypt.compare(
        password,stud.password
    )
    if (!match) {
        return res.status(401).json({
            success:false,
            message:"invalid password"
        })
    }
    const token=jwt.sign(
        {id:stud._id},process.env.JWT_SECRET,{expiresIn:"1d"}
    )
    res.status(200).json({
        success:true,
        message:"login success",
        token,
        studDet:{
            id:stud._id,
            name:stud.name,
            email:stud.email
        }
    })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}
export default logcontrol
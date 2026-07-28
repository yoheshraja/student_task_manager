import jwt from 'jsonwebtoken'
export const authMiddleware=(req,res,next)=>{
    try {
        const authHead=req.headers.authorization;
        if (!authHead) {
            return res.status(401).json({
                success:false,
                message:"please login"
            })
        }
        const token=authHead.split(" ")[1];
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.stud=decode;
        
        
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"invalid token"
        })   
    }
}
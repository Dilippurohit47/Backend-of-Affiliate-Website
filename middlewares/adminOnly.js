import { User } from "../Models/user.model.js";



export const adminOnly = async(req,res,next) =>{

    const {id} =req.query;
    if(!id) return res.status(400).json({
        message:"login first"
    })

    const user = await User.findById(id)

    if(!user) {
        return res.status(400).json({
            message: "Id is not valid"
        })
    }

    if(user.role !== "admin"){
        return res.status(400).json({
            message:"you are not admin"
        })
    }

    next();
}
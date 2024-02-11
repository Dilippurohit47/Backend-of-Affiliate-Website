import mongoose, { Schema, mongo } from "mongoose"
import validator from "validator"


const Userschema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    email : {
        type:String,
        unique:[true , "email already exist "],
        
        required:[true, "please enter email"],
        validate:validator.default.isEmail,
    },


    _id:{
        type:String,
        required:true,   
    },
    role:{
        type:String,
        enum:['admin' , "user"],
        default:"user"
    },
    cartItems: {
      type:Array    
    }

},{timestamps:true}) 

export const User = mongoose.model('User', Userschema)
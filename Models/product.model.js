import mongoose  from "mongoose";

const productSchema =  new mongoose.Schema({

name: {
    type:String,
    required :[true , "please enter name"],
},
photo : {
    type:String,
    // required:[true,"please enter Photo"]
},
price : {
    type:Number,
    required:[true,"please enter Price"]
},
category : {
    type:String,
    required:[true,"please enter product category"],
    trim : true,    
    set: (value) => value.toLowerCase(), 
},

desc : {
    type:String,

},
link : {
    type:String,
    // required:[true," please enter link of the products "]

},
aliExpressLink:{
    type:String
},
publicId:{
    type:String
}


},{timestamps:true})


export const Product = mongoose.model("Product" , productSchema)
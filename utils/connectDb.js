
import mongoose from "mongoose";
// const uri = process.env.MONGO_DB;
const uri ="mongodb+srv://dilip47:dilip47@affiliateproject.6a7khax.mongodb.net/  "

export const connectDb =()=>{

    mongoose.connect(uri ,{
        dbName: "affiliateproject",
    })
    .then((c) => console.log(`DB connected to ${c.connection.host}`) )
    .catch((e) => console.log(e))
};
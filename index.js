import cors from "cors"
import express from "express"
import morgan from "morgan"

import ProductRoute from "./Router/product.router.js"
import UserRoute from "./Router/user.route.js"
import { connectDb } from "./utils/connectDb.js"
import cloudinary from "cloudinary";


connectDb();

const app = express();
app.use(morgan("dev"))
app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello from deployed server ")
    
})

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/product", ProductRoute);

app.use("/uploads",express.static("uploads"))

const port = 8000 || process.env.PORT; 
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})
import express from "express"
import morgan from "morgan"
import cors from "cors"

import userRoute from "../Backend/Router/user.route.js"
import productRoute from "../Backend/Router/product.router.js"
import { connectDb } from "./utils/connectDb.js";



connectDb();
const app = express();
app.use(morgan("dev"))
app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello from server")
    
})

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);

app.use("/uploads",express.static("uploads"))

const port = 8000 || process.env.PORT; 
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})
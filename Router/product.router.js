import express from "express";
import {
  allCategories,
  deleteAll,
  deleteProduct,
  getAllProducts,
  getCategoryProduct,
  getlatestProducts,
  newProduct,

  singleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const app = express.Router();

app.post("/create/new",adminOnly, singleUpload, newProduct);
app.get("/all", getAllProducts);
app.get("/latest", getlatestProducts);
app.get("/category/:category", getCategoryProduct);
app.delete("/:id",adminOnly,  deleteProduct);
app.get("/category", allCategories);
app.get("/:id",singleProduct);
app.delete("/delete", deleteAll);

app.put("/:id",adminOnly,  singleUpload,updateProduct);

export default app;

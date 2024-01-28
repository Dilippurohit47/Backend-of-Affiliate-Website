import express from "express";
import {
  allCategories,
  deleteAll,
  deleteProduct,
  getAllProducts,
  getCategoryProduct,
  getlatestProducts,
  newProduct,
  // searchProducts,
  singleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post("/create/new", singleUpload, newProduct);
app.get("/all", getAllProducts);
app.get("/latest", getlatestProducts);
app.get("/category/:category", getCategoryProduct);
app.delete("/:id", deleteProduct);
app.get("/category", allCategories);
app.get("/:id", singleProduct);
app.delete("/delete", deleteAll);
// app.get("/search/:search", searchProducts);
app.put("/:id", singleUpload,updateProduct);

export default app;

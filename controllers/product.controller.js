import { Product } from "../Models/product.model.js";
import {rm} from "fs";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {deleteFromCloudinary} from "../utils/cloudinary.js"

export const newProduct = async (req, res) => {
  try {
    const { name, link, desc, category, price ,aliExpressLink} = req.body;

    const photo = req.file;
    console.log(name, link, desc, category, price ,aliExpressLink );

    if (!photo)
      return res.status(405).json({
        message: "Please upload images  of product",
      });
    if (!name  || !desc || !category  || !price) {
      return res.status(401).json({
        message: "Please enter all fields",
      });
    }

    const cloudinaryResponse = await uploadOnCloudinary(photo?.path);

await Product.create({
      name,
      link,
      desc,
      category: category.toLowerCase(),
      price,
      aliExpressLink,
      photo: cloudinaryResponse?.secure_url,
      publicId:cloudinaryResponse?.public_id,
    });

 
    return res.status(201).json({
      success: true,
      message: `Product ${name} created  successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in new product creation",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  const { search } = req.query;

  try {
    const baseQuery = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    const products = await Product.find(baseQuery);
    if (!products.length === 0)
      return res.status(400).josn({
        success: false,
        message: `no products available`,
      });

    res.status(201).json({
      success: true,
      message: `products recieved successfully`,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in getting all products",
      error: error.message,
    });
  }
};

export const getlatestProducts = async (req, res) => {
  let products;
  try {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(10);

    return res.status(200).json({
      success: true,
      message: "latest Products find successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);

    if (!product)
      return res.status(400).json({
        message: "Invalid product id  or product deleted already ",
      });
 
      await deleteFromCloudinary(product?.publicId);
     

    await product.deleteOne();
    return res.status(200).json({
      success: true,
      message: `product deleted successfulluy`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in  deleting products ",
      error: error.message,
    });
  }
};



export const allCategories = async (req, res) => {
  try {
    const categoriesWithImages = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          image: { $first: "$photo" },
        },
      },
    ]);

    const categories = categoriesWithImages.map((category) => ({
      name: category._id,
      image: category.image,
    }));

    return res.status(200).json({
      success: true,
      message: "All categories with images",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in getting categories with images",
      error: error.message,
    });
  }
};

export const singleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    let product = await Product.findById(id);
    // console.log(product)

    if (!product)
      return res.status(401).json({
        message: `invalid id or product dosent exist!`,
      });

    return res.status(200).json({
      success: true,
      message: "Product find successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error in gettting singles products `,
      error: error.message,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    await Product.deleteMany({}); // Delete all products

    return res.status(200).json({
      success: true,
      message: "All products deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting all products.",
      error: error.message,
    });
  }
};

export const getCategoryProduct = async (req, res) => {
  const { category } = req.params;

  try {
    const categoryProducts = await Product.find({ category });

    if (!categoryProducts || categoryProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "no products found for specified category",
      });
    }

    return res.status(200).json({
      success: true,
      categoryProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error in getting category product`,
      error: error.message,
    });
  }
};


export const updateProduct = async(req,res) =>{

  const {id} =  req.params;
  const {name ,price , desc ,link , category ,aliExpressLink} =req.body;

  const photo = req.file;


  try {

  const product = await Product.findById(id);
  // console.log(product)


  if(!product) {
    return res.status(404).json({
      message:`Invalid product id`,
    })
  } 
  if(photo){
 

    await deleteFromCloudinary(product?.publicId)
  

    const cloudinaryResponse = await uploadOnCloudinary(photo?.path);
    product.photo = cloudinaryResponse?.secure_url

    }

  if(name) product.name = name
  if(price) product.price = price
  if(desc) product.desc = desc
  if(category) product.category = category
  if(link) product.link = link
  if(aliExpressLink) product.aliExpressLink = aliExpressLink

  await product.save();
return res.status(200).json({
  success:true,
  message:`product ${product.name} updated successfully`,
  product,
})

    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error in updating product `,
      error: error.message,
    });

  }

}
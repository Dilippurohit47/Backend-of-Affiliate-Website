import { Product } from "../Models/product.model.js";
import { User } from "../Models/user.model.js";
import { ObjectId } from "mongoose";

export const newUser = async (req, res) => {
  const { name, email, _id, role } = req.body;

  let user = await User.findById(_id);
  if (user)
    return res.status(200).json({
      success: true,
      message: `Welcome again ,${user.name}`,
      user,
    });

  if (!_id || !name || !email)
    return res.status(400).json({
      success: false,
      message: "Please enter all fields",
    });

  try {
    user = await User.create({
      name,
      email,
      _id,
    });
    return res.status(200).json({
      success: true,
      message: ` welcome ${name} `,
      user,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      // Duplicate email error
      return res.status(400).json({
        success: false,
        error: "Duplicate email",
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Error in user creation",
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0)
      return res.status(200).json({ message: "no users available" });
    return res.status(200).json({
      success: true,
      message: " all users list",
      users,
    });
  } catch (error) {
    res.status(400).json({
      message: "error in getall useres",
      error: error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in get user ${error}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        message: "Id is invalid",
      });
    await user.deleteOne();
    return res.status(200).json({
      success: true,
      message: `User deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error from deletuser ${error}`,
    });
  }
};

export const Addcart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: " first login! to add items into cart",
      });
    }



    const existingIndex = user?.cartItems.findIndex(
      (item) => item?._id.toString() === productId
    );


    if (existingIndex !== -1) {
      user?.cartItems?.splice(existingIndex, 1);
      await user.save();
      return res.status(400).json({
            success: false,
            message: "Product is  removed from cart",
          });
         
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    user.cartItems.push(product);

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      user,
      product,
    });
  } catch (error) {

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

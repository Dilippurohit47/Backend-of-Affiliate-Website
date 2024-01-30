import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.controller.js"

const app = express.Router();

app.get("/user", (req, res) => {
  res.send("hlo from user");
});

app.post("/new", newUser);
app.get("/all", getAllUsers);
app.get("/:id", getUser);
app.delete("/:id", deleteUser);

export default app;

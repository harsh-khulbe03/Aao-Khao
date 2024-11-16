import express from "express";
const userRouter = express.Router();
import authenticate from "../middlewares/user.middleware.js";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getAParticularUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

// To register the user
userRouter.post("/register", registerUser);

// User login
userRouter.post("/login", loginUser);

// To get all the users
userRouter.get("/users", getAllUsers);

// To get a single user
userRouter.get("/user/:userId", getAParticularUser);

//Update a user
userRouter.put("/user/:userId", authenticate, updateUser);

// Delete a user
userRouter.delete("/user/:userId", deleteUser);

export default userRouter;

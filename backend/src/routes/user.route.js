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
userRouter.get("/user", authenticate, getAParticularUser);

//Update a user
userRouter.put("/user/update", authenticate, updateUser);

// Delete a user
userRouter.delete("/user/remove", authenticate, deleteUser);

export default userRouter;

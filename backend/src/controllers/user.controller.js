import User from "../models/user.model.js";
import {
  comparePassword,
  encryptPassword,
  generateToken,
} from "../auth/auth.js";

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await encryptPassword(password);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Enter the required credentials...",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Wrong Password",
      });
    }

    const token = generateToken(user._id, user.email);

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers(_, res) {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }
    return res.status(200).json({
      message: "Successfully got all the users",
      users,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAParticularUser(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found...",
      });
    }
    return res.status(200).json({
      message: "Successfully got the user",
      user,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    const { username, email, password, phoneNo, address, city, state, zip } =
      req.body;
    if (!email && !phoneNo && !address && !city && !state && !zip) {
      return res.status(400).json({
        message: "Enter all the required information",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        password,
        phoneNo,
        address,
        city,
        state,
        zip,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        message: "Can't update the user",
      });
    }
    return res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = req.user._id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(400).json({
        message: "Can't delete the user",
      });
    }
    return res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.log(error);
  }
}

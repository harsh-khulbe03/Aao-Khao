import express from "express";
import {
  fetchCartItems,
  addToCart,
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItem,
} from "../controllers/cart.controller.js";
import authenticate from "../middlewares/user.middleware.js";
const cartRouter = express.Router();

//Fetch cart items
cartRouter.get("/cartItems", authenticate, fetchCartItems);

//Add to cart
cartRouter.post("/addToCart", authenticate, addToCart);

//Increase quantity of the item
cartRouter.post("/increaseQuantity", authenticate, increaseItemQuantity);

//Decrease quantity of the item
cartRouter.delete("/decreaseQuantity", authenticate, decreaseItemQuantity);

// Remove a particular cart item
cartRouter.delete("/removeItem", authenticate, removeItem);

//Clear cart
cartRouter.delete("/clearCart", authenticate, clearCart);

export default cartRouter;

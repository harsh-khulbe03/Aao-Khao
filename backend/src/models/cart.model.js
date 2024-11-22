import mongoose from "mongoose";
import User from "../models/user.model.js";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
    unique: true,
  },
  cartItems: [
    {
      itemId: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String },
      imageId: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

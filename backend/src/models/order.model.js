import mongoose from "mongoose";
import User from "./user.model.js";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    orderItems: [
        {
            itemId: { type: String, required: true },
            name: { type: String, required: true },
            description: { type: String },
            imageId: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 },
        }
    ],
    orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

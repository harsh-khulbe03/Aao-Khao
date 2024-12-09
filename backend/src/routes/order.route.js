import express from "express";
import { createOrder, fetchAllOrders } from "../controllers/order.controller.js";
import authenticate from "../middlewares/user.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", authenticate, createOrder);

orderRouter.get("/orders",authenticate, fetchAllOrders);

export default orderRouter;
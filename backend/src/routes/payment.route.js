import express from "express";
import authenticate from "../middlewares/user.middleware.js";
const paymentRouter = express.Router();
import { createOrder, verifyOrder } from "../controllers/payment.controller.js";

paymentRouter.post("/orders",authenticate, createOrder);

paymentRouter.post("/verify",authenticate, verifyOrder);

export default paymentRouter;
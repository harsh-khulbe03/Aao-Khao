import express from "express";
const paymentRouter = express.Router();
import { createOrder, verifyOrder } from "../controllers/payment.controller.js";

paymentRouter.post("/orders",createOrder);

paymentRouter.post("/verify",verifyOrder);

export default paymentRouter;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "../routes/user.route.js";
import restaurantRouter from "../routes/restaurant.route.js";
import cartRouter from "../routes/cart.route.js";
const app = express();
dotenv.config();
import dbConnect from "../db/db.js";
const port = process.env.PORT || 3002;

app.use(
  cors({
    origin: ["https://aaokhao-frontend.vercel.app", "http://localhost:5173"],
  })
);

app.use(express.json())

dbConnect();

app.use("/api", userRouter);
app.use("/api", restaurantRouter);
app.use("/api",cartRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;

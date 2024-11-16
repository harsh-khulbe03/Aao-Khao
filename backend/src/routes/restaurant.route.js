import express from "express";
const restaurantRouter = express.Router();
import authenticate from "../middlewares/user.middleware.js";
import {
  getInitialSetOfRestaurants,
  getMenuDetailsOfSpecificRestaurant,
  updateListOfRestaurants,
} from "../controllers/restaurant.controller.js";

restaurantRouter.get("/restaurants", authenticate, getInitialSetOfRestaurants);

restaurantRouter.get("/menu/:id", getMenuDetailsOfSpecificRestaurant);

restaurantRouter.get("/update/:noOfRestaurants", updateListOfRestaurants);

export default restaurantRouter;

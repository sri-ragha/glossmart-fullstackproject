import express from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cartController.js"
import authMiddleware from "../middleware/auth.js";


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)


export default cartRouter;

// import express from "express";
// import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";

// const cartRouter = express.Router();

// // Define cart-related routes
// cartRouter.post("/add", addToCart);
// cartRouter.post("/remove", removeFromCart);
// cartRouter.get("/", getCart);

// export default cartRouter;

import express from"express";
import {addToCart,removeAllFromCart,updateQuantity,getCartProducts} from "../controllers/cart.controller.js";
import { productRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",productRoute,getCartProducts);
router.post("/",productRoute,addToCart)
router.delete("/",productRoute,removeAllFromCart);
router.put("/:id",productRoute,updateQuantity);

export default router;
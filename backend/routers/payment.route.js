import express from "express";
import {productRoute } from "../middleware/auth.middleware.js";
import {createCheckoutSession,checkoutSuccess} from "../controllers/payment.cotroller.js";
import { stripe } from "../lib/stripe.js";


const router = express.Router();

router.post("/create-checout-session",productRoute,createCheckoutSession)
router.post("/create-checout-session",productRoute,checkoutSuccess);


export default router;
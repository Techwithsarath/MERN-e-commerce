import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routers/auth_route.js";
import productRoutes from "./routers/product.route.js";
import cartRoutes from "./routers/cart.route.js";
import couponRoutes from "./routers/coupon.route.js";
// import paymentRoutes from "./routers/payment.route.js";
import analyticsRoutes from "./routers/analytic.route.js";

import {connectDB} from "./lib/db.js";






dotenv.config();


const app = express();
console.log(process.env.PORT);

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/coupons",couponRoutes);
// app.use("/api/payment",paymentRoutes);
app.use("/api/analytics",analyticsRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
	});
}

app.listen(5000, () => {
	console.log("Server is running on http://localhost:" + "5000");
	connectDB();
});









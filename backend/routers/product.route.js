import express from "express";
import { productRoute } from "../middleware/auth.middleware.js";

import { getAllProducts,
         getFeatureProducts,
         getRecommedProducts,
         getProductsByCategory,
         updateFeaturedProductsCache,
         toggleFeaturedProduct,
         deleteProduct,
         createProduct, 
         updateProduct,
         getProductById} from "../controllers/product.controller.js";

import { adminRoute } from "../middleware/auth.middleware.js";


const router = express.Router();





router.get("/" , productRoute, adminRoute, getAllProducts);
router.get("/featured" , getFeatureProducts);
router.get("/category/:category",getProductsByCategory);
router.get("/recommendations",getRecommedProducts);
router.post("/",productRoute,adminRoute,createProduct);
router.patch("/:id",productRoute,adminRoute,toggleFeaturedProduct);
router.get("/",productRoute,adminRoute,updateFeaturedProductsCache);
router.delete("/:id",productRoute,adminRoute,deleteProduct);
router.get("/:id", productRoute,adminRoute,getProductById);
router.put("/:id", productRoute,adminRoute,updateProduct);



export default router;
import express from  "express";
import { adminRoute, productRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsData , getDailySalesData} from "../controllers/analytic.controller.js";

const router = express.Router()

router.get("/",productRoute,adminRoute,async(req,res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const  startDate = new Date(endDate.getTime() - 7*24*60*60*1000);

        const dailySalesData = await getDailySalesData(startDate,endDate);

        res.json({
            analyticsData,
            dailySalesData,
        })
    } catch (error) {
        console.log("Error in analyticsroute",error.message);
        res.status(500).json({message:"Server error",error:error.message});
        
    }
})

export default router;
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const getAnalyticsData =  async(req,res) => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData =await Order.aggregate([
        {
            $group:{
                _id:null,
                totalSales:{$sum: 1},
                totalRevenue:{$sum:"$totalAmount"}
            
        }
       }
    ])

    const {totalSales,totalRevenue} = salesData[0] || {totalSales:0,totalRevenue:0};
    return{
        users:totalUsers,
        products:totalProducts,
        totalRevenue,
        totalSales,
    }

};

export const getDailySalesData =  async(startDate,endDate) => {
    try {
        const dailySalesData = await Order.aggregate([{
            $match:{
                createdAt:{
                    $gte:startDate,
                    $lte:endDate,
                },
            },
        },
        {
            $group:{
                _id:{$dateToString:{format:"%y-%m-%d",date:"$createdAt"}},
                sales:{$sum:1},
                revenue:{$sum:"$totalAmount"},
            },
        },
        {$sort:{_id:1}},
    
    ]);
    const dateArray = getDatesInRange(startDate,endDate);
    return dateArray.map(data => {
        const foundData = dailySalesData.find(item => item._id === date);
        
        return{
            date,
            sales:foundData?.sales || 0,
            revenue:foundData?.revenue || 0,
        }
    
      
    })
    } catch (error) {
        throw error;
        
    }


// [
//     {
//         _id:"2025-01-16",
//         sales:12,
//         revenue:1450.75
//     },
//     {
//         _id:"2025-01-17",
//         sales:12,
//         revenue:1350.75
//     },
// ]
}

function getDatesInRange(startDate,endDate){
    const dates = [];
    let currentDate = new Date(startDate);

    while(currentDate<=endDate){
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate()+1);
    }

    return dates;
}


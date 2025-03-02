import Product  from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async(req,res) => {
    try {
        const products = await Product.find({});
        res.json({products});
    } catch (error) {
        console.log("Error in getAllProducts controller",error.message);
        res.status(500).json({message:"Server error",error:error.message});
        
    }
}

export const getFeatureProducts = async(req,res) =>{
    try {
        let featureProducts = await redis.get("feature_products");
        if(featureProducts){
            return res.json(JSON.parse(featureProducts));
        }
        featureProducts = await Product.find({isFeatured:true}).lean();

        if(!featureProducts){

            return res.status(401).json({message:"No feature products found"});
        }

        //store in redis for quick access

        await redis.set("feature_product",JSON.stringify(featureProducts));

        res.json(featureProducts)
    } catch (error) {
        console.log("Error in getFatureProducts controller",error.message);
        res.status(500).json({message:"Server error",error:error.message});
        
    }
}

export const createProduct = async(req,res) =>{
    try {
        const {name,description,price,category,image} = req.body;

        let cloudinaryResponse = null

        if(image){
           cloudinaryResponse = await cloudinary.uploader.upload(image,{folder:"products"});
        }
           const product = await Product.create({
            name,
            description,
            price,
            image:cloudinaryResponse?.secure_url? cloudinaryResponse.secure_url:"",
            category
           })
           res.status(201).json(product)
        
    } catch (error) {
        console.log("Error in createProduct condroller",error.message);
        res.status(500).json({message:"Server error",error:error.message});
        
    }
}





export const deleteProduct = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try{
                await cloudinary.uploader.destroy(`product/${publicId}`)
                console.log("Delete image from cloudinary")
            }catch(error){
                HTMLFormControlsCollection.log("error delete image from cloudinary",error)
                // console.log("error delete image from cloudinary",error)
            }
        }
        await Product.findByIdAndDelete(req.params.id)

        res.json({message:"Product delete successfully"})

    } catch (error) {
        console.log("Error in deleteProduct controller",error.message)
        res.status(500).json({message:"Server error",error:error.message})
        
    }
}

export const getRecommedProducts = async(req,res) =>{
    try {
        const products = await Product.aggregate([
            {
                $sample:{size:3}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                }
            }
        ])
        res.json(products)
    } catch (error) {
        console.log("Error in getRecommdedProducts controller",error.message);
        res.status(500).json({message:"Server error",error:error.message});
    }
}

export const getProductsByCategory = async(req,res) =>{
    const {category} = req.params;
    try {
        const products = await Product.find({category});
        res.json({products});

    } catch (error) {
        console.log("Error in getProductsByCAtegory controller",error.message);
        res.status(500).json({message:"Server error",error:error.message});
        
    }
}
export  const toggleFeaturedProduct= async(req,res) =>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){

            product.isFeatured = !product.isFeatured
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            res.json(updatedProduct);
        }
        else{

            res.status(404).json({message:"Product not found"});
        }
        
    } catch (error) {
        console.log("Error in toggleFeaturedProducts controller",error.message);
        res.status(500).json({message:"Server error",error:error.message});
        
    }
}

 export const updateFeaturedProductsCache =async(req,res) => {
    try {
        const featuredProducts = await Product.find({isFeatured:true}).lean();
        await redis.set("feature_products",JSON.stringify(featuredProducts));
        res.json({ message: "Featured products cache updated" });
    } catch (error) {
        console.log("Error in update cache functionn")
    }
    
}

export const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update product by ID
  export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cloudinaryResponse = null;
        
        // If new image is provided, upload to Cloudinary
        if (image && image !== product.image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });

            // Delete old image from Cloudinary
            if (product.image) {
                const publicId = product.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`products/${publicId}`);
            }
        }

        // Update product fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.image = cloudinaryResponse?.secure_url || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
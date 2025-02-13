const products = require('../models/productModel')
const cloudinary = require('cloudinary').v2


exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter(item => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
      

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? "true" : "false",
            image: imagesUrl,
            date: new Date() 
        };
        const newProduct = new products(productData)
        await newProduct.save()
        res.status(201).json({ success: true, message: "product added" })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


exports.listProduct = async (req, res) => {
    try {
        const product=await products.find()
        res.status(200).json({ success: true,product })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


exports.removeProduct = async (req, res) => {
    try {
        const {sid}=req.params
        await products.findByIdAndDelete(sid)
        return res.status(200).json({success:true,message:"product deleted"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


exports.singleProduct = async (req, res) => {
    try {
        const {sid}=req.params
        const product=await products.findById(sid)
        return res.status(200).json({success:true,product})


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
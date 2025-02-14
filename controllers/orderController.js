const orders=require('../models/orderModel')
const users = require('../models/userModel')

exports.placeOrder=async(req,res)=>{
    try {
        const userId=req.payload
        const {items,amount,address}=req.body

        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder=new orders(orderData)
        await newOrder.save()

        await users.findByIdAndUpdate(userId,{cartData:{}})

        return res.status(200).json({success:true,message:"Order placed"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })  
    }
}


exports.placeOrderStripe=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })  
    }
}


exports.placeOrderRazorepay=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })  
    }
}


exports.allOrders=async(req,res)=>{
    try {
        const allOrder=await orders.find()
        return res.status(200).json({success:true,allOrder})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })  
    }
}


exports.orderUser=async(req,res)=>{
    try {
        const userId=req.payload
        const allOrders=await orders.find({userId})
        return res.status(200).json({success:true,allOrders})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })  
    }
}


exports.updateStatus=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })  
    }
}



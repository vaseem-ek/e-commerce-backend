const users=require('../models/userModel')

exports.addCart=async(req,res)=>{
    try {
        const userId=req.payload
        const {itemId,size}=req.body 
        const userData=await users.findById(userId)
        let cartData=await userData.cartData
        
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }else{
                cartData[itemId][size]=1
            }
        }else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        await users.findByIdAndUpdate(userId,{cartData})
        return res.status(200).json({success:true,message:"Added to cart"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.updateCart=async(req,res)=>{
    try {
        const userId=req.payload
        const {itemId,size,quantity}=req.body
        const userData=await users.findById(userId)
        let cartData=await userData.cartData
        cartData[itemId][size]=quantity

        await users.findByIdAndUpdate(userId,{cartData})
        return res.status(200).json({success:true,message:"Cart Updated"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.getCart=async(req,res)=>{
    try {
        const userId=req.payload
        const userData=await users.findById(userId)
        let cartData=await userData.cartData
        return res.status(200).json({success:true,cartData})     
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
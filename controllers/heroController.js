const hero=require('../models/hero')
const cloudinary = require('cloudinary').v2


exports.addHero=async(req,res)=>{
    try {
        // const userId=req.payload
        const {heroName,caption}=req.body
        const picture=req.file.path
        if(!heroName || !caption || !picture){
            res.status(402).json({success:false,message:"fill in the blank"})
        }  

        const newHero=new hero({
            heroName,caption,picture
        })
        
        await newHero.save()
        res.status(201).json({success:true,newHero})




    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
const getHero=(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
const removeHero=(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}
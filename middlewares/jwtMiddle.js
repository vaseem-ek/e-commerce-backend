const jwt =require('jsonwebtoken')

const jwtMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1]
        const verifiedUser=jwt.verify(token,process.env.PRIVATE_KEY)
        req.payload=verifiedUser.userId        
        next()
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports=jwtMiddleware
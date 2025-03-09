const orders = require('../models/orderModel')
const users = require('../models/userModel')
const Stripe = require('stripe')

const currency = "inr"
const deliveryCharges = 10
const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.payload
        const { items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orders(orderData)
        await newOrder.save()

        await users.findByIdAndUpdate(userId, { cartData: {} })

        return res.status(200).json({ success: true, message: "Order placed" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


exports.placeOrderStripe = async (req, res) => {
    try {
        const userId = req.payload
        const { items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orders(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        })

        return res.status(200).json({success:true,session_url:session.url})



    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}



exports.verifyStripe=async(req,res)=>{
    try {
        const userId=req.payload
        const {orderId,success}=req.body
        if(success=="true"){
            await orders.findByIdAndUpdate(orderId,{payment:true})
            await users.findByIdAndUpdate(userId,{cartData:{}})
            return res.status(200).json({success:true})
        }else{
            await orders.findByIdAndDelete(orderId)
            return res.status(200).json({success:false})

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })   
    }
}

exports.placeOrderRazorepay = async (req, res) => {
    try {


    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


exports.allOrders = async (req, res) => {
    try {
        const allOrder = await orders.find()
        return res.status(200).json({ success: true, allOrder })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


exports.orderUser = async (req, res) => {
    try {
        const userId = req.payload
        const allOrders = await orders.find({ userId })
        return res.status(200).json({ success: true, allOrders })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


exports.updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orders.findByIdAndUpdate(orderId, { status })
        return res.status(200).json({ success: true, message: "Status Updated" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.deleteOrder=async(req,res)=>{
    try {
        const {sid}=req.params
        await orders.findByIdAndDelete(sid)
        return res.status(200).json({success:true,message:"order deleted"})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}



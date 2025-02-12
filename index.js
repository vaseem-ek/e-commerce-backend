const express=require('express')
const cors=require('cors')
require('dotenv').config()
require('./config/db')
const connectCloudinary=require('./config/cloudinary')
const router=require('./routes/route')

connectCloudinary()
const app=express()

app.use(express.json())
app.use(cors())
app.use(router)

const PORT =3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log("server running at ",PORT);
    
})
app.get('/',(req,res)=>{
    res.send('hello world')
})
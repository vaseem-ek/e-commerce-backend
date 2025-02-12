const mongoose=require('mongoose')

const connection=process.env.MONGODB_URL

mongoose.connect(connection).then((res)=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err);
    
})


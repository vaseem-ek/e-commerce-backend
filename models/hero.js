const mongoose=require('mongoose')


const heroSchema=new mongoose.Schema({
    heroName:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    // picture:{
    //     type:String,
    //     required:true
    // },
})

const hero=mongoose.model('/hero',heroSchema)
module.exports=hero
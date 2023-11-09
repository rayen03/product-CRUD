const { Timestamp } = require('mongodb');
const mongoose=require('mongoose');
const productSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please enter the Name']},
        type:{
            type : String ,
            required : true}
        ,
        quantity:{
            type : Number,
            required:true,default:0},
        
        price:{
            type:Number,
            required:true 
        },
        image:{
            type:String,
            required:false
        }  

    },
    {
        Timestamps:true
    }
    
    
)
const product =mongoose.model('Product',productSchema);
module.exports=product;
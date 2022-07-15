const mongoose =require('mongoose')
const OrderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:[{
        productSlug:{type:String},
        quantity:{type:Number},
        price:{type:Number}
    }],
    address:{type:String,required:true},
    amount:{type:Number,required:true},
    status:{type:String,required:true,default:'Pending'},
    pincode:{type:String,required:true},
    phone:{type:String,required:true}
},{timestamps:true})
export default mongoose.models.Order || mongoose.model('Order',OrderSchema)

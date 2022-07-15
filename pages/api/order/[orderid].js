import connectDb from "../../../middleware/mongoose"
import Order from "../../../models/Order"

const handler=async(req,res)=>{
    try{
        if(req.method=="GET"){
            const order=await Order.findOne({_id:req.query.orderid});
            res.status(201).json({success:true,order})
        }
    }catch(err){
        res.status(500).json({success:false,message:err.message})
    }
}
export default connectDb(handler)
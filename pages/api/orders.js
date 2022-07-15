import connectDb from "../../middleware/mongoose"
import Order from '../../models/Order'
const handler=async(req,res)=>{
    if(req.method=="GET"){
      try{
        const orders=await Order.find();
        res.status(201).json({success:true,orders})
      }catch(err){
        res.status(500).json({success:false,message:err.message})
      }
        
    }
}
export default connectDb(handler)
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose";
const handler=async(req,res)=>{
    if(req.method=='POST'){
        try{
            const product=await Product.findOne({slug:req.body.slug})
            if(!product){
                res.status(400).json({success:false,q:0})
                return;
            }
            res.status(201).json({success:true,q:product.availableQty})
        }catch(err){
            res.status(500).json({success:false,message:err.message})
        }

    }
}
export default connectDb(handler)
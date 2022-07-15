
import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";
const handler=async(req,res)=>{
    if(req.method=='POST'){
        try{
            let products=[];
            let {userId,productSlugs,address,amount,pincode,phone,quantities,prices}=req.body;
            for(let i=0;i<productSlugs.length;i++){
                const product=await Product.findOne({slug:productSlugs[i]}).exec();
                if(product){
                    if(product.availableQty>=quantities[i]){
                         let p={
                            productSlug:productSlugs[i],
                            price:prices[i],
                            quantity:quantities[i]
                        }
                        product.availableQty-=1;
                        products.push(p);
                        await product.save();
                    }
                }
            }
            console.log(userId,products,address,amount,pincode,phone);
            if(!userId || !products || !address || !amount || !pincode || !phone){
                return res.status(400).json({success:false,message:'Invalid Credentials'})
            }
            const order=await Order.create({userId,products,address,amount,pincode,phone});
            res.status(201).json({success:true,message:'Order Placed',order})
        }catch(err){
            console.log(err.message);
            res.status(500).json({ success: false, message: err.message });
        }
    }
}
export default connectDb(handler)
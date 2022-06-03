import User from "../../models/User"
const CryptoJS = require("crypto-js");
import connectDb from "../../middleware/mongoose";
const handler=async(req,res)=>{
    if(req.method=='POST'){
        try{
            const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({sucess:false,message:'Please enter all the fields'})
        }
        let user=await User.findOne({email:email}).exec()
        if(user){
            return res.status(400).json({success:false,message:'User Already exists'})
           
        }
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(password), process.env.SECRET_KEY).toString();
        user=await User.create({name,email,password:ciphertext})
        // const token= jwt.sign({_id:user._id},process.env.SECRET_KEY)
        res.status(201).json({sucess:true,message:'Sign up successfully'})
        }catch(err){
            res.status(500).json({success:false,message:err.message})
        }
    }
}
export default connectDb(handler);
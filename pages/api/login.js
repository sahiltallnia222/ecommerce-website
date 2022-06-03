import User from "../../models/User"
const CryptoJS = require("crypto-js");
import jwt from 'jsonwebtoken'
import connectDb from "../../middleware/mongoose";
const handler=async(req,res)=>{
    if(req.method=='POST'){
        try{
            const {email,password}=req.body
            if(!email || !password){
                return res.status(400).json({sucess:false,message:'Please enter all the fields'})
            }
            const user=await User.findOne({email:email}).exec()
            if(!user){
                return res.status(400).json({success:false,message:'User not found'})
            }
            var bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            const token= jwt.sign({_id:user._id},process.env.SECRET_KEY)
            if(password==decryptedData){
                res.status(201).json({success:true,token})
            }
            else{
                res.status(400).json({success:false,message:'Invalid Credentials'})
            }
        }catch(err){
            res.status(500).json({success:false,message:err.message})
        }
    }
}
export default connectDb(handler)
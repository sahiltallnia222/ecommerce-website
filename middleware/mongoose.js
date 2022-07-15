import mongoose from "mongoose";
// connectDb takes function as a argument and return that function by connecting the database
// we get req,res when request is made from the browser
const connectDb=handler=>async (req,res)=>{
    // check if already connected
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
     mongoose.connect(process.env.MONGO_URL)
    return handler(req,res);
}   
export default connectDb

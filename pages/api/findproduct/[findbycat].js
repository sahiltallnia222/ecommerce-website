import connectDb from "../../../middleware/mongoose";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  try {
    let p =await Product.find({'category':req.query.findbycat});
    let products={};
    for(let item of p){
      if(products[item.title] && item.availableQty>0){
        if(!products[item.title].size.includes(item.size)){
          products[item.title].size.push(item.size[0])
        }
        if(!products[item.title].color.includes(item.color)){
          products[item.title].color.push(item.color[0])
        }
      }
      else{
        if(item.availableQty>0){
          products[item.title.trim()]=item
        }
      }
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export default connectDb(handler);

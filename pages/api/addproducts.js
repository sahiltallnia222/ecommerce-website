import mongoose from "mongoose";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      for (let i = 0; i < req.body.length; i++) {
        const {
          title,
          desc,
          img,
          category,
          size,
          color,
          price,
          availableQty
        } = req.body[i];
        let slug=title.toLowerCase().split(' ').join('-')+'-'+color.toLowerCase()+'-'+size.toLowerCase()
        console.log(slug);
        let p = new Product({
          title,
          slug,
          desc,
          img,
          category,
          size,
          color,
          price,
          availableQty,
        });
        await p.save();
      }
      res.status(200).json({message:'products added successfully'} )
    } else {
      res.status(400).json({ error: "Wrong method " });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export default connectDb(handler);

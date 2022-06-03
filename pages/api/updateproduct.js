import mongoose from "mongoose";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";

const handler = async (req, res) => {
  try {
    if (req.method == "PUT") {
      for (let i = 0; i < req.body.length; i++) {
        await Product.findByIdAndUpdate(
          { _id: req.body[i]._id },
          req.body[i]
        );
      }
      res.status(200).json({ message: "products updated successfully" });
    } else {
      res.status(400).json({ error: "Wrong method " });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export default connectDb(handler);

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCost: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

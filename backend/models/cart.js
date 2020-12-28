const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const productInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product"
  },
  name: String,
  size: String,
  count: Number,
  price: Number
});

const ProductInCart = mongoose.model("ProductInCart", productInCartSchema);


const cartSchema = new mongoose.Schema({
  products: [productInCartSchema],
  transaction_id: {},
  amount: {
    type: Number,
  },
  address: String,
  update: Date,
  user: {
    type: ObjectId,
    ref: "User"
  },
}, {timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);


module.exports = { Cart, ProductInCart };
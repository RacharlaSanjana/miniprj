const mongoose = require('mongoose')
//create schema
const cartSchema = new mongoose.Schema({
    p_id:Number,
    p_img:String,
    p_cost:Number,
    qty:Number,
    u_name:String,
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
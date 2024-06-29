//import db schema
const Product = require('../../models/Product')
const User=require('../../models/users')
//get all products
const products_all = async(req,res)=>{
    try{
        const products = await Product.find()
        console.log('Data Sent')
        res.json(products)
    }
    catch(error){
        console.log('Fetch Error :-',error)
        res.join({'message':error})
    }
}
const getProductById = async (req, res) => {
    const p_id = req.params.id;
    try {
        const product = await Product.findOne({ p_id });
        if (product) {
            console.log('Product Found');
            res.json(product);
        } else {
            console.log('Product Not Found');
            res.status(404).send({ 'message': 'Product Not Found' });
        }
    } catch (error) {
        console.log('Fetch Error :-', error);
        res.status(400).send(error);
    }
};

const insertProduct = async (req, res) => {
    const productitem = new Product(req.body);
    try {
        const savedProduct = await  productitem.save();
        console.log('Product inserted');
        res.status(201).send(savedProduct);
    } catch (error) {
        console.error('Error inserting cart:', error);
        res.status(400).send(error);
    }
}
const update_product = async (req, res) => {
    let p_id = req.body.p_id;
    const product = {
        p_name: req.body.p_name,
        p_cost: req.body.p_cost,
        p_cat: req.body.p_cat,
        p_desc:req.body.p_desc,
        p_img:req.body.p_img
    }
    try {
        const updateProduct = await Product.updateOne(
            { p_id }, product
        )
        if (updateProduct.modifiedCount != 0) {
            console.log('Product Updated', updateProduct)
            res.send({ 'update': 'success' })
        }
        else {
            console.log('Product not updated')
            res.send({ 'update': 'Record Not Found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
        console.log(err)
    }
}
const delete_product = async (req, res) => {
    let p_id = req.body.p_id
    try {
        const deletedproduct = await Product.deleteOne({ p_id })
        if (deletedproduct.deletedCount != 0) {
            console.log('Product Deleted')
            res.send({ 'delete': 'success' })
        }
        else {
            console.log('Product Not deleted')
            res.send({ 'delete': 'Record Not Found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}

 
module.exports = {
    products_all,
    getProductById,
    insertProduct,
    update_product,
    delete_product
}


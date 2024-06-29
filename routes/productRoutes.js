const express = require('express');
//create router instance
const router = express.Router();
//import productApi
const fetch = require('../apis/productApi/fetch')
//fetch all records
router.get("/fetch", fetch.products_all)
router.post("/product",fetch.getProductById)
router.post("/insertproduct",fetch.insertProduct)
router.put('/updateproduct',fetch.update_product)
router.delete('/deleteproduct',fetch.delete_product)

module.exports = router;

const express = require('express');
const router = express.Router();
const fetch = require('../apis/Cart/fetchcart');

// Route for handling login requests
router.post('/fetchcart',fetch.fetchCart)
router.post('/insertcart',fetch.insertCart)
router.put('/updatecart',fetch.update_cart)
router.delete('/deletecart',fetch.delete_cart)



module.exports = router;

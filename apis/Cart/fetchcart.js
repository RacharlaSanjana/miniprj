const Cart=require('../../models/Cart')
const fetchCart = async (req, res) => {
    let u_name = req.body.u_name;

    if (!u_name) {
        console.error('u_name is required');
        return res.status(400).json({ error: 'u_name is required' });
    }

    try {
        const cartItems = await Cart.find({u_name});
        if (cartItems.length === 0) {
            console.log(`No cart items found for user: ${u_name}`);
            return res.status(404).json({ message: 'No cart items found' });
        }

        console.log(`Cart items for user ${u_name}:`, cartItems);
        res.json(cartItems);
        console.log(`Cart response for ${u_name} sent`);
    } catch (err) {
        console.error('Error fetching cart data:', err);
        res.status(500).json({ error: 'Error fetching cart data' });
    }
};
const insertCart=async(req,res)=>{
    let obj = {
    	"p_id": req.body.p_id,
    	"p_cost": req.body.p_cost,
    	"qty": req.body.qty,
    	"p_img": req.body.p_img,
    	"u_name": req.body.u_name
	}
    const cartitem = new Cart(obj);
    try {
        const savedcart = await  cartitem.save();
        console.log('Cart inserted');
        res.status(201).send(savedcart);
    } catch (error) {
        console.error('Error inserting cart:', error);
        res.status(400).send(error);
    }

};
//update cart
const update_cart = async (req, res) => {
    let u_name = req.body.u_name
    let p_id = req.body.p_id
    const cart = {
        qty: req.body.qty
    }
    try {
        const updateCart = await Cart.updateOne(
            { u_name,p_id }, cart
        )
        if (updateCart.modifiedCount != 0) {
            console.log('Cart data updated', updateCart)
            res.send({ 'update': 'success' })
        }
        else {
            console.log('Cart not updated')
            res.send({ 'update': 'Record Not Found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}
const delete_cart = async (req, res) => {
    let obj={
     p_id : req.body.p_id,
     u_name:req.body.u_name
    }
    try {
        const deletedcart = await Cart.deleteOne(obj)
        if (deletedcart.deletedCount != 0) {
            console.log('Cart Deleted')
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
    fetchCart,
    insertCart,
    update_cart,
    delete_cart
};
const express = require('express');
const router = express.Router();
const Cart = require('../model/cart');

// Get Cart
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart);
});

// Update Cart Item Selection
router.put('/select/:userId/:productId', async (req, res) => {
  const { selected } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { userId: req.params.userId, 'products.productId': req.params.productId },
    { $set: { 'products.$.selected': selected } },
    { new: true }
  );
  res.json(cart);
});

// Calculate Total Price
router.get('/total/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  const total = cart.products
    .filter(product => product.selected)
    .reduce((acc, product) => acc + product.price * product.quantity, 0);
  res.json({ total });
});

// Delete All Products
router.delete('/delete/:userId', async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.params.userId },
    { $set: { products: [] } },
    { new: true }
  );
  res.json(cart);
});

module.exports = router;

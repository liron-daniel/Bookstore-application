import express from 'express';

import * as cartController from '../controllers/cart.controller.js';
import userAuth from '../middlewares/user.auth.js';

const router = new express.Router();

router.get('/cart', userAuth, cartController.getCartData);

router.delete('/cart/remove-from-cart', userAuth, cartController.removeBookFromCart);

router.patch('/cart/update', userAuth, cartController.updateCart);

router.patch('/cart/add-to-cart', userAuth, cartController.addBookToCart);

router.patch('/cart/checkout', userAuth, cartController.buyCartItems);

export default router;
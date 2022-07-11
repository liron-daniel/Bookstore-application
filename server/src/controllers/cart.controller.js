import Cart from "../models/cart.model.js";
import { SuccessResponse } from "../models/response.model.js";

export const getCartData = async (req, res) => {
    const user = req.user;

    try {
        const cart = await Cart.findOne({ownerID: user._id});
        if (!cart) throw new Error();

        await cart.populate('books.bookID');

        await cart.save();

        res.send(new SuccessResponse(200, 'Ok', '', { cart }))
        // res.send({
        //     status: 200,
        //     statusText: 'Ok',
        //     data: {cart: cart},
        //     message: ''
        // });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};

export const removeBookFromCart = async (req, res) => {
    const user = req.user;
    const bookID = req.body.bookID;
    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: ''
        });
    }

    try {
        const cart = await Cart.findOne({ownerID: user._id});
        if (!cart) throw new Error();

        if (!cart.books.find((bookDoc) => bookDoc.bookID.toString() === bookID)) throw new Error();

        cart.books = cart.books.filter((bookDoc) => bookDoc.bookID.toString() !== bookID);

        await cart.populate('books.bookID');

        await cart.save();

        res.status(202).send({
            status: 202,
            statusText: 'Accepted',
            data: {cart: cart},
            message: 'Book was removed from cart successfully'
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};

export const updateCart = async (req, res) => {
    const user = req.user;
    const bookID = req.body.bookID;
    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: ''
        });
    }
    const quantity = req.body.quantity;
    if (!quantity) {
        return res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: ''
        });
    }

    try {
        const cart = await Cart.findOne({ownerID: user._id});
        if (!cart) throw new Error();

        for(let i = 0; i < cart.books.length; i++) {
            const bookDoc = cart.books[i];
            if(bookDoc.bookID.toString() === bookID && bookDoc.quantity > 0  && bookDoc.quantity < 11) {
                cart.books[i].quantity = quantity;
            }
        }
        
        await cart.populate('books.bookID');

        await cart.save();

        res.status(202).send({
            status: 202,
            statusText: 'Accepted',
            data: {cart: cart},
            message: 'Cart was updated successfully'
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};

export const addBookToCart = async (req, res) => {
    const user = req.user;
    const bookID = req.body.bookID;
    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: ''
        });
    }
    let quantity = req.body.quantity;
    if (!quantity) {
        return res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: ''
        });
    }

    try {
        const cart = await Cart.findOne({ownerID: user._id});
        if (!cart) throw new Error();

        if (!cart.books.find((bookDoc) => bookDoc.bookID.toString() === bookID)) {
            cart.books.unshift({bookID: bookID, quantity: quantity}); 
        } else {
            for(let i = 0; i < cart.books.length; i++) {
                const bookDoc = cart.books[i];

                if(bookDoc.bookID.toString() === bookID) {
                    bookDoc.quantity = quantity;
                }
            }
        }

        // let quantity = 0;
        // if (!cart.books.find((bookDoc) => bookDoc.bookID.toString() === bookID)) {
        //     cart.books.unshift({bookID: bookID, quantity: 1}); 
        // } else {
        //     for(let i = 0; i < cart.books.length; i++) {
        //         const bookDoc = cart.books[i];

        //         if(bookDoc.bookID.toString() === bookID) {
        //             if(bookDoc.quantity < 10) {
        //                 bookDoc.quantity++;
        //                 quantity = bookDoc.quantity; 
        //             } else {
        //                 quantity = bookDoc.quantity;
        //             }
                    
        //         }
        //     }
        // }

        await cart.populate('books.bookID');
        // await cart.populate('books.quantity');

        await cart.save();
        
        res.status(202).send({
            status: 202,
            statusText: 'Accepted',
            data: {cart: cart},
            message: 'Book was added to cart successfully'
            // message: quantity < 10 ? 'Book was added to cart successfully' : 'Book was already added to cart 10 times'
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};

export const buyCartItems = async (req, res) => {
    const user = req.user;

    try {
        const cart = await Cart.findOne({ownerID: user._id});
        if (!cart) throw new Error();

        cart.books = [];

        await cart.save();

        res.send({
            status: 200,
            statusText: 'Ok',
            data: {cart: cart},
            message: 'Checkout was successful'
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};

import React, {useContext} from "react";
import environments from "../../../../environments/environments.js";
import './cart-book.styles.css';

import {AuthContext} from '../../../../contexts/Auth.context.jsx';
import {CartContext} from '../../../../contexts/Cart.context.jsx';

import { deleteBookAction, increaseQuantityAction, decreaseQuantityAction } from '../../../../actions/cart.action.js';

const API_URL = environments.REACT_APP_API_URL;

const CartBook = (props) => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const handleIncreaseQuantity = async () => {
        const bookID = props.id;
        const quantity = props.quantity;
        const data = {
            bookID: bookID,
            quantity: quantity,
        };
        const token = authContextValue.userToken;

        try {
            const response = await fetch(`${API_URL}/cart/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.status !== 202) throw new Error();

            const action = increaseQuantityAction(bookID, quantity);
            cartContextValue.dispatchCartState(action);
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    const handleDecreaseQuantity = async () => {
        const bookID = props.id;
        const quantity = props.quantity;
        const data = {
            bookID: bookID,
            quantity: quantity,
        };
        const token = authContextValue.userToken;

        try {
            const response = await fetch(`${API_URL}/cart/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.status !== 202) throw new Error();

            const action = decreaseQuantityAction(bookID, quantity);
            cartContextValue.dispatchCartState(action);
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    const handleDeleteBook = async () => {
        const bookID = props.id;
        const bookPrice = props.price;
        const quantity = props.quantity;
        const data = {
            bookID: bookID,
            bookPrice: bookPrice
        };
        const token = authContextValue.userToken;

        try {
            const response = await fetch(`${API_URL}/cart/remove-from-cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.status !== 202) throw new Error();

            const responseObj = await response.json();
            const message = responseObj.message;
            alert(message);

            const action = deleteBookAction(bookID, bookPrice, quantity);
            cartContextValue.dispatchCartState(action);
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    return (
        <div className="cart-book-container">
            <img className="cart-book-cover" src={props.bookCover} alt={props.title}/>

            <div className="cart-book-info">
                <div className="cart-book-title">{props.title}</div>

                <div className="cart-book-author">by {props.author}</div>
            </div>

            <div className="cart-book-quantity-container">
                <button type="button" className="update-cart-btn" onClick={handleDecreaseQuantity}>-</button>
                <div className="cart-book-quantity">{props.quantity}</div>
                <button type="button" className="update-cart-btn" onClick={handleIncreaseQuantity}>+</button>
            </div>

            <div className="cart-book-price-btn">
                <div className="cart-book-price">price: ${props.price}</div>
                
                <button type="button" className="delete-from-cart-btn" onClick={handleDeleteBook}>DELETE</button>
            </div>
        </div>
    );
};

export default CartBook;
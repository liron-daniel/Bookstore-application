import React, {useEffect, useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import environments from "../../environments/environments.js";
import './cart-page.styles.css';

import Loader from "../../components/shared/loader/Loader.component.jsx";
import BooksContainer from "./books-container/BooksContainer.component.jsx";

import { AuthContext } from "../../contexts/Auth.context.jsx";
import { CartContext } from "../../contexts/Cart.context.jsx";
import { initCartAction, buyCartAction } from "../../actions/cart.action.js";

const API_URL = environments.REACT_APP_API_URL;

const CartPage = () => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);
    const token = authContextValue.userToken;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const handleBuyCart = async () => {
        try {
            const response = await fetch(`${API_URL}/cart/checkout`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error();

            const responseObj = await response.json();
            const message = responseObj.message;
            alert(message);

            const action = buyCartAction();
            cartContextValue.dispatchCartState(action);
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await fetch(`${API_URL}/cart`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error();

                const responseObj = await response.json();
                const cart = responseObj.data.cart;

                const action = initCartAction(cart.books);
                cartContextValue.dispatchCartState(action);

                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            } catch (err) {
                console.log(err);
                alert('Something went wrong!');
                navigate('*');
            }
        };

        if (!token) {
            navigate('/login');
            return;
        }
        
        getCart();
    }, []);

    return isLoading ? (
        <Loader/>
    ) : cartContextValue.cartState.books.length === 0 ? (
        <main className="empty-cart-page">Your cart is empty</main>
    ) : (
        <main className="cart-page">
            <BooksContainer/>

            <div className="total-price">Total Price: ${cartContextValue.cartState.price}</div>

            <button type="button" className="buy-cart-btn" onClick={handleBuyCart}>Checkout</button>
        </main>
    );
};

export default CartPage;
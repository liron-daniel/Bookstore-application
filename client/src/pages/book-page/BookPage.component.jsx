import React, {useEffect, useState, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import environments from "../../environments/environments.js";
import './book-page.styles.css';

import Loader from "../../components/shared/loader/Loader.component.jsx";
import { AuthContext } from "../../contexts/Auth.context.jsx";
import { AdminContext } from "../../contexts/Admin.context.jsx";

const API_URL = environments.REACT_APP_API_URL;

const BookPage = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const token = authContextValue.userToken;
    const adminContextValue = useContext(AdminContext);
    const params = useParams();
    const [book, setBook] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantity = () => {
        if (quantity < 10) {
            quantity++;
            setQuantity(quantity);
        }
        console.log(quantity);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            quantity--;
            setQuantity(quantity);
        }
        console.log(quantity);
    };

    const handleClick = async () => {
        if (!token) {
            alert('You must login in order to add book to cart');
            return;
        }

        const data = {
            bookID: params.bookID,
            quantity: quantity
        };

        try {
            const response = await fetch(`${API_URL}/cart/add-to-cart`, {
                method: 'PATCH',
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

        } catch (err) {
            console.log(err);
            alert('Something went wrong!');
        }
    };
    
    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await fetch(`${API_URL}/books/${params.bookID}`);

                if (!response.ok) throw new Error();

                const responseObj = await response.json();
                const book = responseObj.data.book;
                setBook(book);
                
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            } catch (err) {
                console.log(err);
                alert('Something went wrong!');
                navigate('*');
            }
        };
        getBook();
        
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className="book-page">
            <img className="book-page-cover" src={book.bookCover} alt={book.title}/>

            <div className="book-page-info">
                <div>
                    <div className="book-page-title">{book.title}</div>

                    <div className="book-page-author">by {book.author}</div>
                </div>
                
                <div className="book-page-pages">pages: {book.pages}</div>

                <div className="book-quantity-container">
                    <button type="button" className="update-quantity-btn" onClick={handleDecreaseQuantity}>-</button>
                    <div className="book-quantity">{quantity}</div>
                    <button type="button" className="update-quantity-btn" onClick={handleIncreaseQuantity}>+</button>
                </div>

                <div className="book-page-price">price: ${book.price}</div>
                
                {!adminContextValue.adminToken && (
                    <button type="button" className="add-to-cart-btn" onClick={handleClick}>ADD TO CART</button>                    
                )}
            </div>

            <div className="book-page-description-container">
                <div className="book-page-decription-title">Overview</div>
                <p className="book-page-description">{book.description}</p>
            </div>
        </main>
    );
};

export default BookPage;
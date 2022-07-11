import React, {useContext} from "react";
import './books-container.styles.css';

import { CartContext } from "../../../contexts/Cart.context.jsx";
import CartBook from "./cart-book/CartBook.component.jsx";

const BooksContainer = () => {
    const cartContextValue = useContext(CartContext);

    return (
        <ul className="cart-books-container">
            {cartContextValue.cartState.books.map((cartBook) => (
                    <CartBook 
                    id={cartBook.bookID._id} 
                    bookCover={cartBook.bookID.bookCover} 
                    title={cartBook.bookID.title} 
                    author={cartBook.bookID.author} 
                    price={cartBook.bookID.price}
                    quantity={cartBook.quantity} 
                    />
            ))}
        </ul>
    );
};

export default BooksContainer;
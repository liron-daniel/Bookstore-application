import cartActionTypes from "../actions/cart.action.js";

export const CART_INITIAL_STATE = {books: [], price: 0};

const cartReducer = (state, action) => {
    switch (action.type) {
        case cartActionTypes.INIT_CART: {
            const books = action.payload.books;

            let price = 0;
            for (let i = 0; i < books.length; i++) {
                const book = books[i].bookID;
                price += (book.price * books[i].quantity);
            }

            price = price.toFixed(2);

            const updatedState = {books: books, price: price};

            return updatedState;
        }
        case cartActionTypes.DELETE_BOOK: {
            const bookID = action.payload.bookID;
            const bookPrice = action.payload.bookPrice;
            const quantity = action.payload.quantity;

            const updatedBooks = state.books.filter((books) => books.bookID._id !== bookID);
            const updatedPrice = state.price - bookPrice * quantity;

            const updatedState = {books: updatedBooks, price: updatedPrice.toFixed(2)};

            return updatedState;
        }
        case cartActionTypes.INCREASE_QUANTITY: {
            const bookID = action.payload.bookID;
            const quantity = action.payload.quantity;
            const books = state.books;

            let price = +state.price;
            for (let i = 0; i < books.length; i++) {
                const book = books[i].bookID;
                if(book._id === bookID && quantity > 0  && quantity < 10) {
                    price += book.price;
                    state.books[i].quantity = quantity + 1;
                }
            }

            const updatedState = {books: books, price: price.toFixed(2)};

            return updatedState;
        }
        case cartActionTypes.DECREASE_QUANTITY: {
            const bookID = action.payload.bookID;
            const quantity = action.payload.quantity;
            const books = state.books;

            let price = +state.price;
            for (let i = 0; i < books.length; i++) {
                const book = books[i].bookID;
                if(book._id === bookID && quantity > 1  && quantity < 11) {
                    price -= book.price;
                    state.books[i].quantity = quantity - 1;
                }
            }

            const updatedState = {books: books, price: price.toFixed(2)};

            return updatedState;
        }
        case cartActionTypes.BUY_CART: {
            const updatedState = {books: [], price: 0};

            return updatedState;
        }
        default: {
            return state;
        }
    }
};

export default cartReducer;
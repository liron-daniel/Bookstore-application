import bookActionTypes from "../actions/book.action.js";

export const BOOK_INITIAL_STATE = {books: []};

const bookReducer = (state, action) => {
    switch (action.type) {
        case bookActionTypes.INIT_BOOK: {
            const books = action.payload.books;

            const updatedState = {books: books};

            return updatedState;
        }
        case bookActionTypes.ADD_NEW_BOOK: {
            const book = action.payload.book;

            const booksState = JSON.parse(JSON.stringify(state));
            booksState.books.push(book);

            return booksState;
        }
        case bookActionTypes.UPDATE_BOOK: {
            const book = action.payload.book;

            const booksState = {...state}
            JSON.parse(JSON.stringify(booksState));

            const foundIndex = booksState.books.findIndex((bookDoc) => bookDoc._id === book._id);

            booksState.books[foundIndex] = book;

            const updatedBooks = booksState.books;

            const updatedState = {books: updatedBooks};

            return updatedState;
        }
        case bookActionTypes.DELETE_BOOK: {
            const bookID = action.payload.bookID;

            const updatedBooks = state.books.filter((books) => books._id !== bookID);

            const updatedState = {books: updatedBooks};

            return updatedState;
        }
        default: {
            return state;
        }
    }
};

export default bookReducer;
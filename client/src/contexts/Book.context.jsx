import { createContext, useReducer } from "react";
import bookReducer, {BOOK_INITIAL_STATE} from "../reducers/book.reducer.js";

export const BookContext = createContext();

const BookContextProvider = (props) => {
    const [bookState, dispatchBookState] = useReducer(bookReducer, BOOK_INITIAL_STATE);
    const value = {
        bookState: bookState,
        dispatchBookState: dispatchBookState
    };
    
    return (
        <BookContext.Provider value={value}>
            {props.children}
        </BookContext.Provider>
    );
};

export default BookContextProvider;
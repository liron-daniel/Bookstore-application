const bookActionTypes = {
    INIT_BOOK: 'INIT_BOOK',
    ADD_NEW_BOOK: 'ADD_NEW_BOOK',
    UPDATE_BOOK: 'UPDATE_BOOK',
    DELETE_BOOK: 'DELETE_BOOK'
};

export const initBookAction = (books) => {
    const action = {
        type: bookActionTypes.INIT_BOOK,
        payload: {
            books: books,
        }
    };

    return action;
};

export const addNewBookAction = (book) => {
    const action = {
        type: bookActionTypes.ADD_NEW_BOOK,
        payload: {
            book: book
        }
    };

    return action;
};

export const updateBookAction = (book) => {
    const action = {
        type: bookActionTypes.UPDATE_BOOK,
        payload: {
            book: book
        }
    };

    return action;
};

export const deleteBookAction = (bookID) => {
    const action = {
        type: bookActionTypes.DELETE_BOOK,
        payload: {
            bookID: bookID
        }
    };

    return action;
};

export default bookActionTypes;
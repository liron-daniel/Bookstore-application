const cartActionTypes = {
    INIT_CART: 'INIT_CART',
    DELETE_BOOK: 'DELETE_BOOK',
    BUY_CART: 'BUY_CART', 
    DECREASE_QUANTITY: 'DECREASE_QUANTITY',
    INCREASE_QUANTITY: 'INCREASE_QUANTITY'
};

export const initCartAction = (books) => {
    const action = {
        type: cartActionTypes.INIT_CART,
        payload: {
            books: books
        }
    };

    return action;
};

export const deleteBookAction = (bookID, bookPrice, quantity) => {
    const action = {
        type: cartActionTypes.DELETE_BOOK,
        payload: {
            bookID: bookID,
            bookPrice: bookPrice,
            quantity: quantity
        }
    };

    return action;
};

export const decreaseQuantityAction = (bookID, quantity) => {
    const action = {
        type: cartActionTypes.DECREASE_QUANTITY,
        payload: {
            bookID: bookID,
            quantity: quantity
        }
    };

    return action;
};

export const increaseQuantityAction = (bookID, quantity) => {
    const action = {
        type: cartActionTypes.INCREASE_QUANTITY,
        payload: {
            bookID: bookID, 
            quantity: quantity
        }
    };

    return action;
};

export const buyCartAction = () => {
    const action = {
        type: cartActionTypes.BUY_CART,
        payload: {}
    };

    return action;
};

export default cartActionTypes;
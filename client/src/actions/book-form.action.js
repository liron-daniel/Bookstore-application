const bookFormActionTypes = {
    UPDATE_TITLE: 'UPDATE_TITLE',
    UPDATE_AUTHOR: 'UPDATE_AUTHOR',
    UPDATE_BOOK_COVER: 'UPDATE_BOOK_COVER',
    UPDATE_DESCRIPTION: 'UPDATE_DESCRIPTION',
    UPDATE_PAGES: 'UPDATE_PAGES',
    UPDATE_PRICE: 'UPDATE_PRICE'
};

const updateState = (value, isValid, errorMessage, actionType) => {
    const action = {
        type: actionType,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage
        }
    };
    return action;
};

export const updateTitleAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, bookFormActionTypes.UPDATE_TITLE);
};

export const updateAuthorAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, bookFormActionTypes.UPDATE_AUTHOR);
};

export const updateBookCoverAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, bookFormActionTypes.UPDATE_BOOK_COVER);
};

export const updateDescriptionAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, bookFormActionTypes.UPDATE_DESCRIPTION);
};

export const updatePagesAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, bookFormActionTypes.UPDATE_PAGES);
};

export const updatePriceAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, bookFormActionTypes.UPDATE_PRICE);
};

export default bookFormActionTypes;
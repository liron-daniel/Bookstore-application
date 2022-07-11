import bookFormActionTypes from "../actions/book-form.action.js";

export const BOOK_FORM_INITIAL_STATE = {
    values: {
        title: '',
        author: '',
        bookCover: '',
        description: '',
        pages: '',
        price: ''
    },
    validities: {
        title: true,
        author: true,
        bookCover: true,
        description: true,
        pages: true,
        price: true
    },
    errorMessages: {
        title: '',
        author: '',
        bookCover: '',
        description: '',
        pages: '',
        price: ''
    }
};

const bookFormReducer = (state, action) => {
    switch (action.type) {
        case bookFormActionTypes.UPDATE_TITLE: {
            const updatedTitleValue = action.payload.value;
            const updatedIsTitleValid = action.payload.isValid;
            const updatedTitleErrorMessage = action.payload.errorMessage;

            const updatedValues = { ...state.values, title: updatedTitleValue };
            const updatedValidities = { ...state.validities, title: updatedIsTitleValid };
            const updatedErrorMessages = { ...state.errorMessages, title: updatedTitleErrorMessage };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookFormActionTypes.UPDATE_AUTHOR: {
            const updatedAuthorValue = action.payload.value;
            const updatedAuthorIsValid = action.payload.isValid;
            const updatedAuthorErrorMessage = action.payload.errorMessage;

            const updatedValues = { ...state.values, author: updatedAuthorValue };
            const updatedValidities = { ...state.validities, author: updatedAuthorIsValid };
            const updatedErrorMessages = { ...state.errorMessages, author: updatedAuthorErrorMessage };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookFormActionTypes.UPDATE_BOOK_COVER: {
            const updatedBookCoverValue = action.payload.value;
            const updatedBookCoverIsValid = action.payload.isValid;
            const updatedBookCoverErrorMessage = action.payload.errorMessage;

            const updatedValues = { ...state.values, bookCover: updatedBookCoverValue };
            const updatedValidities = { ...state.validities, bookCover: updatedBookCoverIsValid };
            const updatedErrorMessages = { ...state.errorMessages, bookCover: updatedBookCoverErrorMessage };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookFormActionTypes.UPDATE_DESCRIPTION: {
            const updatedDescriptionValue = action.payload.value;
            const updatedDescriptionIsValid = action.payload.isValid;
            const updatedDescriptionErrorMessage = action.payload.errorMessage;

            const updatedValues = { ...state.values, description: updatedDescriptionValue };
            const updatedValidities = { ...state.validities, description: updatedDescriptionIsValid };
            const updatedErrorMessages = { ...state.errorMessages, description: updatedDescriptionErrorMessage };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookFormActionTypes.UPDATE_PAGES: {
            const updatedPagesValue = action.payload.value;
            const updatedPagesIsValid = action.payload.isValid;
            const updatedPagesErrorMessage = action.payload.errorMessage;

            const updatedValues = { ...state.values, pages: updatedPagesValue };
            const updatedValidities = { ...state.validities, pages: updatedPagesIsValid };
            const updatedErrorMessages = { ...state.errorMessages, pages: updatedPagesErrorMessage };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookFormActionTypes.UPDATE_PRICE: {
            const updatedPriceValue = action.payload.value;
            const updatedPriceIsValid = action.payload.isValid;
            const updatedPriceErrorMessage = action.payload.errorMessage;

            const updatedValues = { ...state.values, price: updatedPriceValue };
            const updatedValidities = { ...state.validities, price: updatedPriceIsValid };
            const updatedErrorMessages = { ...state.errorMessages, price: updatedPriceErrorMessage };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        default: {
            return state;
        }
    }
};

export default bookFormReducer;
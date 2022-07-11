import signupActionTypes from "../actions/signup.action.js";

export const SIGNUP_FORM_INITIAL_STATE = {
    values: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    },
    validities: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true
    },
    errorMessages: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
};

// console.log(Object.getOwnPropertyNames(state.values)[0])
    
const updateState = (state, action, i) => {
    const keyName = {
        value: Object.getOwnPropertyNames(state.values)[i],
        validity: Object.getOwnPropertyNames(state.validities)[i],
        errorMessage: Object.getOwnPropertyNames(state.errorMessages)[i]
    };

    // const keyNameValue = Object.getOwnPropertyNames(state.values)[0];
    // const keyNameValidity = Object.getOwnPropertyNames(state.validities)[0];
    // const keyNameErrorMessage = Object.getOwnPropertyNames(state.errorMessages)[0];

    const updatedValue = action.payload.value;
    const updatedIsValid = action.payload.isValid;
    const updatedErrorMessage = action.payload.errorMessage;

    const updatedValues = {...state.values, [keyName.value]: updatedValue};
    const updatedValidities = {...state.validities, [keyName.validity]: updatedIsValid};
    const updatedErrorMessages = {...state.errorMessages, [keyName.errorMessage]: updatedErrorMessage};

    const updatedState = {
        values: updatedValues,
        validities: updatedValidities,
        errorMessages: updatedErrorMessages,
    };

    return updatedState;
};

const signupReducer = (state, action) => {
    switch(action.type){
        case signupActionTypes.UPDATE_FIRST_NAME: {
            // const updatedFirstNameValue = action.payload.value;
            // const updatedFirstNameIsValid = action.payload.isValid;
            // const updatedFirstNameErrorMessage = action.payload.errorMessage;

            // const updatedValues = {...state.values, firstName: updatedFirstNameValue};
            // const updatedValidities = {...state.validities, firstName: updatedFirstNameIsValid};
            // const updatedErrorMessages = {...state.errorMessages, firstName: updatedFirstNameErrorMessage};

            // const updatedState = {
            //     values: updatedValues,
            //     validities: updatedValidities,
            //     errorMessages: updatedErrorMessages,
            // };

            // return updatedState;

            return updateState(state, action, 0);
        }
        case signupActionTypes.UPDATE_LAST_NAME: {
            // const updatedLastNameValue = action.payload.value;
            // const updatedLastNameIsValid = action.payload.isValid;
            // const updatedLastNameErrorMessage = action.payload.errorMessage;

            // const updatedValues = {...state.values, lastName: updatedLastNameValue};
            // const updatedValidities = {...state.validities, lastName: updatedLastNameIsValid};
            // const updatedErrorMessages = {...state.errorMessages, lastName: updatedLastNameErrorMessage};

            // const updatedState = {
            //     values: updatedValues,
            //     validities: updatedValidities,
            //     errorMessages: updatedErrorMessages,
            // };

            // return updatedState;

            return updateState(state, action, 1);
        }
        case signupActionTypes.UPDATE_EMAIL: {
            // const updatedEmailValue = action.payload.value;
            // const updatedIsEmailValid = action.payload.isValid;
            // const updatedEmailErrorMessage = action.payload.errorMessage;

            // const updatedValues = { ...state.values, email: updatedEmailValue };
            // const updatedValidities = { ...state.validities, email: updatedIsEmailValid };
            // const updatedErrorMessages = { ...state.errorMessages, email: updatedEmailErrorMessage };

            // const updatedState = {
            //     values: updatedValues,
            //     validities: updatedValidities,
            //     errorMessages: updatedErrorMessages,
            // };

            // return updatedState;

            return updateState(state, action, 2);
        }
        case signupActionTypes.UPDATE_PASSWORD: {
            // const updatedPasswordValue = action.payload.value;
            // const updatedIsPasswordValid = action.payload.isValid;
            // const updatedPasswordErrorMessage = action.payload.errorMessage;

            // const updatedValues = { ...state.values, password: updatedPasswordValue };
            // const updatedValidities = { ...state.validities, password: updatedIsPasswordValid };
            // const updatedErrorMessages = { ...state.errorMessages, password: updatedPasswordErrorMessage };

            // const updatedState = {
            //     values: updatedValues,
            //     validities: updatedValidities,
            //     errorMessages: updatedErrorMessages,
            // };

            // return updatedState;

            return updateState(state, action, 3);
        }
        case signupActionTypes.UPDATE_CONFIRM_PASSWORD: {
            // const updatedConfirmPasswordValue = action.payload.value;
            // const updatedIsConfirmPasswordValid = action.payload.isValid;
            // const updatedConfirmPasswordErrorMessage = action.payload.errorMessage;

            // const updatedValues = { ...state.values, confirmPassword: updatedConfirmPasswordValue };
            // const updatedValidities = { ...state.validities, confirmPassword: updatedIsConfirmPasswordValid };
            // const updatedErrorMessages = { ...state.errorMessages, confirmPassword: updatedConfirmPasswordErrorMessage };

            // const updatedState = {
            //     values: updatedValues,
            //     validities: updatedValidities,
            //     errorMessages: updatedErrorMessages,
            // };

            // return updatedState;

            return updateState(state, action, 4);
        }
        default: {
            return state;
        }
    }
};

export default signupReducer;
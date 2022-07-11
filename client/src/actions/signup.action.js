const signupActionTypes = {
    UPDATE_FIRST_NAME: 'UPDATE_FIRST_NAME',
    UPDATE_LAST_NAME: 'UPDATE_LAST_NAME',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    UPDATE_CONFIRM_PASSWORD: 'UPDATE_CONFIRM_PASSWORD'
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

export const updateFirstNameAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, signupActionTypes.UPDATE_FIRST_NAME);

    // const action = {
    //     type: signupActionTypes.UPDATE_FIRST_NAME,
    //     payload: {
    //         value: value,
    //         isValid: isValid,
    //         errorMessage: errorMessage
    //     }
    // };
    // return action;
};

export const updateLastNameAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, signupActionTypes.UPDATE_LAST_NAME);

    // const action = {
    //     type: signupActionTypes.UPDATE_LAST_NAME,
    //     payload: {
    //         value: value,
    //         isValid: isValid,
    //         errorMessage: errorMessage
    //     }
    // };
    // return action;
};

export const updateEmailAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, signupActionTypes.UPDATE_EMAIL);

    // const action = {
    //     type: signupActionTypes.UPDATE_EMAIL,
    //     payload: {
    //         value: value,
    //         isValid: isValid,
    //         errorMessage: errorMessage
    //     }
    // };
    // return action;
};

export const updatePasswordAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, signupActionTypes.UPDATE_PASSWORD);

    // const action = {
    //     type: signupActionTypes.UPDATE_PASSWORD,
    //     payload: {
    //         value: value,
    //         isValid: isValid,
    //         errorMessage: errorMessage
    //     }
    // };
    // return action;
};

export const updateConfirmPasswordAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, signupActionTypes.UPDATE_CONFIRM_PASSWORD);

    // const action = {
    //     type: signupActionTypes.UPDATE_CONFIRM_PASSWORD,
    //     payload: {
    //         value: value,
    //         isValid: isValid,
    //         errorMessage: errorMessage
    //     }
    // };
    // return action;
};

export default signupActionTypes;
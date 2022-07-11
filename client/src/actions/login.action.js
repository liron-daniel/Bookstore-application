const loginActionTypes = {
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD'
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

export const updateEmailAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, loginActionTypes.UPDATE_EMAIL);
};

export const updatePasswordAction = (value, isValid, errorMessage) => {
    return updateState(value, isValid, errorMessage, loginActionTypes.UPDATE_PASSWORD);
};

export default loginActionTypes;
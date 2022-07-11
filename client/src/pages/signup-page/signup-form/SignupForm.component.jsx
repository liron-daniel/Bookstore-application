import React, {useReducer, useContext} from "react";
import {Link, useNavigate} from 'react-router-dom';
import environments from "../../../environments/environments.js";
import './signup-form.styles.css';

import FormInputContainer from "../../../components/form/form-input-container/FormInputContainer.component.jsx";
import { AuthContext } from "../../../contexts/Auth.context.jsx";
import signupReducer, {SIGNUP_FORM_INITIAL_STATE} from "../../../reducers/signup.reducer.js";
import { updateFirstNameAction, updateLastNameAction, updateEmailAction, updatePasswordAction, updateConfirmPasswordAction } from "../../../actions/signup.action.js";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

const API_URL = environments.REACT_APP_API_URL;

const SignupForm = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [signupState, dispatchSignupState] = useReducer(signupReducer, SIGNUP_FORM_INITIAL_STATE);

    const handleFirstNameInput = (event) => {
        const firstNameInput = event.target.value.trim();

        if(firstNameInput === '') {
            dispatchSignupState(updateFirstNameAction(firstNameInput, false, 'Please enter your first name'));
            return;
        }

        dispatchSignupState(updateFirstNameAction(firstNameInput, true, ''));
    };

    const handleLastNameInput = (event) => {
        const lastNameInput = event.target.value.trim();

        if (lastNameInput === '') {
            dispatchSignupState(updateLastNameAction(lastNameInput, false, 'Please enter your last name'));
            return;
        }

        dispatchSignupState(updateLastNameAction(lastNameInput, true, ''));
    };

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.trim();

        if (emailInput === '') {
            dispatchSignupState(updateEmailAction(emailInput, false, 'Please enter an email address'));
            return;
        }

        if (!isEmail(emailInput)) {
            dispatchSignupState(updateEmailAction(emailInput, false, 'Please enter a valid email address'));
            return;
        }

        dispatchSignupState(updateEmailAction(emailInput, true, ''));
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === '') {
            dispatchSignupState(updatePasswordAction(passwordInput, false, 'Please enter a password'));
            return;
        }

        if (!isStrongPassword(passwordInput)) {
            dispatchSignupState(updatePasswordAction(passwordInput, false, 'You must enter a password with the length of 8-20 characters and contains at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 symbol'));
            return;
        }

        dispatchSignupState(updatePasswordAction(passwordInput, true, ''));
    };

    const handleConfirmPasswordInput = (event) => {
        const confirmPasswordInput = event.target.value.trim();

        if (confirmPasswordInput === '') {
            dispatchSignupState(updateConfirmPasswordAction(confirmPasswordInput, false, 'Please enter your password again'));
            return;
        }

        if (confirmPasswordInput !== signupState.values.password) {
            dispatchSignupState(updateConfirmPasswordAction(confirmPasswordInput, false, "Your passwords don't match"));
            return;
        }

        dispatchSignupState(updateConfirmPasswordAction(confirmPasswordInput, true, ''));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const values = signupState.values;
        const validities = signupState.validities;

        if (values.firstName === '' || !validities.firstName ||
            values.lastName === '' || !validities.lastName ||
            values.email === '' || !validities.email ||
            values.password === '' || !validities.password ||
            values.confirmPassword === '' || !validities.confirmPassword) {
                return;
        }
        
        const signupValues = signupState.values;
        const data = {
            firstName: signupValues.firstName,
            lastName: signupValues.lastName,
            email: signupValues.email,
            password: signupValues.password
        };

        try {
            const response = await fetch(`${API_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status !== 201) throw new Error();

            const responseData = await response.json();
            const token = responseData.data.token;

            localStorage.setItem('user-token', token);
            authContextValue.setUserToken(token);

            navigate('/')
        } catch (err) {
            console.log(err);
            alert('Something went wrong!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-card-form">
            <FormInputContainer id="signup-first-name" labelText="First Name:" required={true} handleInput={handleFirstNameInput} isValid={signupState.validities.firstName} errorMessage={signupState.errorMessages.firstName}/>

            <FormInputContainer id="signup-last-name" labelText="Last Name:" required={true} handleInput={handleLastNameInput} isValid={signupState.validities.lastName} errorMessage={signupState.errorMessages.lastName}/>

            <FormInputContainer id="signup-email" labelText="Email Address:" type="email" required={true} handleInput={handleEmailInput} isValid={signupState.validities.email} errorMessage={signupState.errorMessages.email}/>

            <FormInputContainer id="signup-password" labelText="Password:" type="password" required={true} handleInput={handlePasswordInput} isValid={signupState.validities.password} errorMessage={signupState.errorMessages.password}/>

            <FormInputContainer id="signup-confirm-password" labelText="Confirm Password:" type="password" required={true} handleInput={handleConfirmPasswordInput} isValid={signupState.validities.confirmPassword} errorMessage={signupState.errorMessages.confirmPassword}/>

            <Link to="/login" className="login-link">
                Have an account already? Login...
            </Link>

            <button type="submit" id="signup-submit-button">Sign Up</button>
        </form>
    );
};

export default SignupForm;
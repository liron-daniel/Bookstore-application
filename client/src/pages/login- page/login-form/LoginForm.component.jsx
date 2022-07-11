import React, {useReducer, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import environments from "../../../environments/environments.js";
import './login-form.styles.css';

import FormInputContainer from "../../../components/form/form-input-container/FormInputContainer.component.jsx";
import loginReducer, {LOGIN_FORM_INITIAL_STATE} from "../../../reducers/login.reducer.js";
import {updateEmailAction, updatePasswordAction} from '../../../actions/login.action.js';
import {AuthContext} from '../../../contexts/Auth.context.jsx';
import isEmail from "validator/lib/isEmail";
import isStrongPassword from 'validator/lib/isStrongPassword';

const API_URL = environments.REACT_APP_API_URL;

const LoginForm = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);
    
    const [loginState, dispatchLoginState] = useReducer(loginReducer, LOGIN_FORM_INITIAL_STATE);

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();

        if (emailInput === '') {
            dispatchLoginState(updateEmailAction(emailInput, false, 'Please enter an email address'));
            return;
        }

        if (!isEmail(emailInput)) {
            dispatchLoginState(updateEmailAction(emailInput, false, 'Please enter a valid email address'));
            return;
        }

        dispatchLoginState(updateEmailAction(emailInput, true, ''));
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === '') {
            dispatchLoginState(updatePasswordAction(passwordInput, false, 'Please enter a password'));
            return;
        }

        if (!isStrongPassword(passwordInput)) {
            dispatchLoginState(updatePasswordAction(passwordInput, false, 'Please enter a valid password'));
            return;
        }

        dispatchLoginState(updatePasswordAction(passwordInput, true, ''));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const values = loginState.values;
        const validities = loginState.validities;

        if (values.email === '' || !validities.email || values.password === '' || !validities.password) {
            return;
        }

        const loginValues = loginState.values;
        const data = {
            email: loginValues.email,
            password: loginValues.password
        };

        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error();

            const responseData = await response.json();
            const token = responseData.data.token;

            localStorage.setItem('user-token', token);
            authContextValue.setUserToken(token);

            navigate('/');
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-card-form">
            <FormInputContainer id="login-email" labelText="Email Address:" type="email" required={true} handleInput={handleEmailInput} isValid={loginState.validities.email} errorMessage={loginState.errorMessages.email}/>

            <FormInputContainer id="login-password" labelText="Password:" type="password" required={true} handleInput={handlePasswordInput} isValid={loginState.validities.password} errorMessage={loginState.errorMessages.password}/>

            <Link to='/signup' className='signup-link'>
                Don't have an account? Signup...
            </Link>

            <button type="submit" id="login-submit-button">Login</button>
        </form>
    );
};

export default LoginForm;
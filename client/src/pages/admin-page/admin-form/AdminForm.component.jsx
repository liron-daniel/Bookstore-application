import React, {useReducer, useContext} from "react";
import { useNavigate } from "react-router-dom";
import environments from "../../../environments/environments.js";
import './admin-form.styles.css';

import FormInputContainer from "../../../components/form/form-input-container/FormInputContainer.component.jsx";
import adminReducer, {ADMIN_FORM_INITIAL_STATE} from "../../../reducers/admin.reducer.js";
import { updateEmailAction, updatePasswordAction } from "../../../actions/admin.action.js";
import { AdminContext } from "../../../contexts/Admin.context.jsx";
import isEmail from "validator/lib/isEmail.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";

const API_URL = environments.REACT_APP_API_URL;

const AdminForm = () => {
    const navigate = useNavigate();

    const adminContextValue = useContext(AdminContext);

    const [adminState, dispatchAdminState] = useReducer(adminReducer, ADMIN_FORM_INITIAL_STATE);

    const handleEmailInput = (event) => {
        const emailInput = event.target.value.toLowerCase().trim();

        if (emailInput === '') {
            dispatchAdminState(updateEmailAction(emailInput, false, 'Please enter an email address'));
            return;
        }

        if (!isEmail(emailInput)) {
            dispatchAdminState(updateEmailAction(emailInput, false, 'Please enter a valid email address'));
            return;
        }

        dispatchAdminState(updateEmailAction(emailInput, true, ''));
    };

    const handlePasswordInput = (event) => {
        const passwordInput = event.target.value.trim();

        if (passwordInput === '') {
            dispatchAdminState(updatePasswordAction(passwordInput, false, 'Please enter a password'));
            return;
        }

        if (!isStrongPassword(passwordInput)) {
            dispatchAdminState(updatePasswordAction(passwordInput, false, 'Please enter a valid password'));
            return;
        }

        dispatchAdminState(updatePasswordAction(passwordInput, true, ''));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const values = adminState.values;
        const validities = adminState.validities;

        if (values.email === '' || !validities.email || values.password === '' || !validities.password) {
            return;
        }

        const adminValues = adminState.values;
        const data = {
            email: adminValues.email,
            password: adminValues.password
        };

        try {
            const response = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error();

            const responseData = await response.json();
            const token = responseData.data.token;

            localStorage.setItem('admin-token', token);
            adminContextValue.setAdminToken(token);

            navigate('/admin/dashboard');
        } catch (err) {
            console.log(err);
            alert('Something went wrong!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-card-form">
            <FormInputContainer id="admin-email" labelText="Email Address:" type="email" required={true} handleInput={handleEmailInput} isValid={adminState.validities.email} errorMessage={adminState.errorMessages.email}/>

            <FormInputContainer id="admin-password" labelText="Password:" type="password" required={true} handleInput={handlePasswordInput} isValid={adminState.validities.password} errorMessage={adminState.errorMessages.password}/>

            <button type="submit" id="admin-submit-button">Login</button>
        </form>
    );
};

export default AdminForm;
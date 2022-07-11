import React, {useEffect, useState, useReducer, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import './signup-page.styles.css';

import Loader from "../../components/shared/loader/Loader.component.jsx";
import Card from "../../components/card/Card.component.jsx";
import SignupForm from "./signup-form/SignupForm.component.jsx";
import { AuthContext } from "../../contexts/Auth.context.jsx";

const SignupPage = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);
    
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (authContextValue.userToken) navigate('/');

        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className="signup-page">
            <Card className="signup-card">
                <h2 className="signup-card-title">Hello New User!</h2>

                <SignupForm/>
            </Card>
        </main>
    );
};

export default SignupPage;
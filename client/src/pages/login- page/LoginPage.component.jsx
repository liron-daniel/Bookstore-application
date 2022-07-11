import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import './login-page.styles.css';

import LoginForm from "./login-form/LoginForm.component.jsx";
import Loader from "../../components/shared/loader/Loader.component.jsx";
import Card from "../../components/card/Card.component.jsx";
import { AuthContext } from "../../contexts/Auth.context.jsx";

const LoginPage = () => {
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
        <main className="login-page">
            <Card className="login-card">
                <h2 className="login-card-title">Welcome Back!</h2>

                <LoginForm/>
            </Card>
        </main>
    );
};

export default LoginPage;
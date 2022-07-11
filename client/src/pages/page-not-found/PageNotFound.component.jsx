import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './page-not-found.styles.css';

import Loader from "../../components/shared/loader/Loader.component.jsx";

const PageNotFound = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className="page-not-found-main">
            <div className="page-not-found-title">
                <h1 className="page-not-found-header">404</h1>
                <h2 className="page-not-found-header">Page Not Found</h2>
            </div>

            <button className="page-not-found-btn" onClick={handleClick}>Home</button>
        </main>
        
    );
};

export default PageNotFound;
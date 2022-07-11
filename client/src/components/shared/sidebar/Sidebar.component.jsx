import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import environments from "../../../environments/environments.js";
import './sidebar.styles.css';

import { AuthContext } from "../../../contexts/Auth.context.jsx";
import { AdminContext } from "../../../contexts/Admin.context.jsx";

const API_URL = environments.REACT_APP_API_URL;

const Sidebar = (props) => {
    const authContextValue = useContext(AuthContext);
    const adminContextValue = useContext(AdminContext);
    const navigate = useNavigate();

    const handleUserLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/users/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authContextValue.userToken}`
                }
            });

            if(!response.ok) throw new Error();

            const responseObj = await response.json();
            const message = responseObj.message;
            alert(message);

            localStorage.removeItem('user-token');
            authContextValue.setUserToken(null);

            props.hideSidebar();
            navigate('/');
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    const handleAdminLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${adminContextValue.adminToken}`
                }
            });

            if(!response.ok) throw new Error();

            const responseObj = await response.json();
            const message = responseObj.message;
            alert(message);

            localStorage.removeItem('admin-token');
            adminContextValue.setAdminToken(null);

            props.hideSidebar();
            navigate('/');
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    return (
        <div className={`sidebar-background ${props.className}`}>
            <div className="sidebar-container">
                <button type="button" className="x" onClick={props.hideSidebar}>
                    X
                </button>

                <ul className="sidebar-items">
                    <li className="sidebar-item">
                        <Link to="" onClick={props.hideSidebar}>Home</Link>
                    </li>
                    {!authContextValue.userToken && !adminContextValue.adminToken && (
                        <li className="sidebar-item">
                            <Link to="login" onClick={props.hideSidebar}>Login</Link>
                        </li>
                    )}
                    {authContextValue.userToken && !adminContextValue.adminToken && (
                        <li className="sidebar-item">
                            <Link to="cart" onClick={props.hideSidebar}>Cart</Link>
                        </li>
                    )}
                    {(authContextValue.userToken || adminContextValue.adminToken) && (
                        <li className="sidebar-item">
                            <button type="button" className="logout-btn" onClick={authContextValue.userToken ? handleUserLogout : handleAdminLogout}>Logout</button>
                        </li>
                    )}
                    {/* {authContextValue.userToken && (
                        <li className="sidebar-item">
                            <button type="button" className="logout-btn" onClick={handleUserLogout}>Logout</button>
                        </li>
                    )}
                    {adminContextValue.adminToken && (
                        <li className="sidebar-item">
                            <button type="button" className="logout-btn" onClick={handleAdminLogout}>Logout</button>
                        </li>
                    )} */}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
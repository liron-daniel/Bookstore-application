import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import './admin-page.styles.css';

import AdminForm from './admin-form/AdminForm.component.jsx';
import Loader from "../../components/shared/loader/Loader.component.jsx";
import Card from "../../components/card/Card.component.jsx";
import { AdminContext } from "../../contexts/Admin.context.jsx";

const AdminPage = () => {
    const navigate = useNavigate();

    const adminContextValue = useContext(AdminContext);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (adminContextValue.adminToken) {
            navigate('/admin/dashboard');
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className="admin-page">
            <Card className="admin-card">
                <h2 className="admin-card-title">Welcome Admin</h2>

                <AdminForm/>
            </Card>
        </main>
    );
};

export default AdminPage;
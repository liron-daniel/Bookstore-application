import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const token = localStorage.getItem('admin-token');

    const INITIAL_STATE = token ? token : null;
    const [adminToken, setAdminToken] = useState(INITIAL_STATE);

    const value = {
        adminToken: adminToken,
        setAdminToken: setAdminToken
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
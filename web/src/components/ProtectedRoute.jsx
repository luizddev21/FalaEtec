import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../js/api.js";

export default function ProtectedRoute({ children }) {

    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {

        async function verifyAuthentication() {

            let isAuthenticated = await api.checkAuth();

            if (!isAuthenticated) {

                const refreshed = await api.refresh();

                if (refreshed) {
                    isAuthenticated = await api.checkAuth();
                }
            }

            setAuthenticated(isAuthenticated);
        }

        verifyAuthentication();

    }, []);


    if (authenticated === null) {
        return <div>Carregando...</div>;
    }


    if (!authenticated) {
        return (
            <Navigate
                to="/sub/login"
                replace
            />
        );
    }


    return children;
}

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../js/api.js";
import Loading from "./Loading.jsx";

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verifyAuthentication() {
      setLoading(true);

      let isAuthenticated = await api.checkAuth();

      if (!isAuthenticated) {
        const refreshed = await api.refresh();

        if (refreshed) {
          isAuthenticated = await api.checkAuth();
        }
      }

      setAuthenticated(isAuthenticated);
      setLoading(false);
    }

    verifyAuthentication();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (authenticated === false) {
    return <Navigate to="/sub/login" replace />;
  }

  return children;

  return children;
}

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../js/api.js";
import Loading from "./Loading.jsx";

export default function AdminRoute({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function verifyAdmin() {
      setLoading(true);

      let isAdmin = await api.checkAdmin();

      setAdmin(isAdmin);
      setLoading(false);
    }

    verifyAdmin();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (admin === false) {
    return <Navigate to="/" replace />;
  }

  return children;
}

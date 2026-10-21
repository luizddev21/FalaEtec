// Protege páginas de aluno: verifica sessão, tenta renová-la se necessário e
// direciona ao login quando o servidor não confirma autenticação.
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../js/api.js";
import Loading from "./Loading.jsx";

export default function ProtectedRoute({ children }) {
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // O resultado da API controla o indicador de espera e o destino da rota.
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

  // Este segundo retorno é inalcançável: o retorno anterior já encerra a função.
  return children;
}

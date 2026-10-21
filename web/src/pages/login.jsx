// Tela de entrada: valida a sessão existente, coleta RM/tipo/senha e envia as
// credenciais à API; sucesso leva ao início e falha aparece junto ao formulário.
import Screen from "../components/Screen.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Message from "../components/Message.jsx";

import api from "../js/api.js";

export default function Login() {
  const [authenticated, setAuthenticated] = useState(null);
  const [error, setError] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Se o token de acesso venceu, tenta renová-lo antes de manter o login aberto.
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

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    // Lê os valores pelos nomes dos campos, autentica e atualiza o estado da tela.
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const rm = formData.get("rm");
    const type = formData.get("type");
    const password = formData.get("password");

    try {
      setLoading(true);
      await api.login(rm, password, type);
      setAuthenticated(true);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
      <Screen center fullscreen loading={loading}>
      <section className="login center">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Login</h1>

          <div className="camp">
            <div className="input">
              <input type="text" maxLength="5" id="rm" name="rm" required />
              <label htmlFor="rm">RM</label>
            </div>

            <div className="input">
              <select name="type" id="type" aria-label="Tipo de usuário">
                <option value="aluno">Aluno</option>
                <option value="professor">Professor</option>
                <option value="gestor">Gestor</option>
              </select>
            </div>
          </div>

          <div className="camp">
            <div className="input">
              <input type="password" name="password" id="password" required />
              <label htmlFor="password">Senha</label>
            </div>
          </div>

          <div className="camp">
            <div className="input">
              <span>
                <Link to="/sub/forgot-password">Esqueci a minha senha</Link>
              </span>
            </div>
          </div>

          { error !== "" && <Message type="error" message={error} form /> }

          <div className="camp">
            <div className="input">
              <button type="submit" className="login-button default">
                Entrar
              </button>
            </div>
          </div>
        </form>
      </section>
    </Screen>
  );
}

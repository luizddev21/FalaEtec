import Screen from "../components/Screen.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import api from "../js/api.js";

export default function Login() {
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

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const rm = formData.get("rm");
    const type = formData.get("type");
    const password = formData.get("password");

    try {
      await api.login(rm, password, type);
      setAuthenticated(true);
    } catch (error) {
      console.error("Erro no login:", error.message);
    }
  }

  return (
    <Screen>
      <section className="login center">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Login</h2>

          <div className="camp">
            <div className="input">
              <input type="text" maxLength="5" id="rm" name="rm" required />
              <label htmlFor="rm">RM</label>
            </div>

            <div className="input">
              <select name="type" id="type">
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
                <Link to="/sub/forgot-my-password">Esqueci a minha senha</Link>
              </span>
            </div>
          </div>

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

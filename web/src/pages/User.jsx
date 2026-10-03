import Screen from "../components/Screen";
import NavBlockButton from "../components/NavBlockButton.jsx";

import api from "../js/api.js";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userData, setUserData] = useState({});

  // Loading
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await api.logout();
      navigate("/sub/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);

        const response = await api.apiFetch("/user/profile");

        const data = await response.json();

        setUserData(data.user);
      } catch (error) {
        console.error("Erro ao carregar informações do usuário", error);
        setError("Erro ao carregar informações do usuário.");
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  function handleNavigate(type) {
    navigate(`/interaction/all`, {
      state: { type },
    });
  }

  return (
    <Screen loading={loading}>
      <section className="user-info">
        <h2 className="title">Informações Pessoais</h2>

        <div className="camp">
          <div className="output">
            <p className="label">Nome</p>
            <p className="value">{userData.name}</p>
          </div>
        </div>

        <div className="camp">
          {userData.type === "aluno" && (
            <div className="output">
              <p className="label">Sala</p>
              <p className="value">{userData.classroom}</p>
            </div>
          )}

          <div className="output">
            <p className="label">RM</p>
            <p className="value">{userData.rm}</p>
          </div>
        </div>

        <div className="camp">
          {["professor", "gestor"].includes(userData.type) && (
            <div className="input">
              <button className="default" onClick={() => navigate("/admin")}>
                Painel Administrativo
              </button>
            </div>
          )}
          <div className="input">
            <button className="danger" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </section>

      {userData.type === "aluno" && (
        <section className="history">
          <h2 className="title">Histórico</h2>

          <div className="button-box column">
            <NavBlockButton
              onClick={() => handleNavigate("solicitacao")}
              image="VSO"
              mode="static"
              column
              button
            />

            <NavBlockButton
              onClick={() => handleNavigate("relato")}
              image="HRE"
              mode="static"
              column
              button
            />

            <NavBlockButton
              onClick={() => handleNavigate("sugestao")}
              image="VSU"
              mode="static"
              column
              button
            />

            <NavBlockButton
              onClick={() => handleNavigate("avaliacao")}
              image="VAV"
              mode="static"
              column
              button
            />
          </div>
        </section>
      )}
    </Screen>
  );
}

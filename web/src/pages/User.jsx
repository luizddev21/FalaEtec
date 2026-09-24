import Screen from "../components/Screen";
import NavBlockButton from "../components/NavBlockButton.jsx";

import api from "../js/api.js";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userData, setUserData] = useState({});

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
      const response = await api.apiFetch("/user/profile");

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setUserData(data.user);
    }

    loadUserData();
  }, []);

  return (
    <Screen>
      <section className="user-info">
        <h2 className="title">Informações Pessoais</h2>

        <div className="camp">
          <div className="output">
            <p className="label">Nome</p>
            <p className="value">{userData.name}</p>
          </div>
        </div>

        <div className="camp">
          <div className="output">
            <p className="label">Sala</p>
            <p className="value">{userData.classroom}</p>
          </div>

          <div className="output">
            <p className="label">RM</p>
            <p className="value">{userData.rm}</p>
          </div>
        </div>

        <div className="camp">
          <div className="input">
            <button className="danger" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </section>

      <section className="user-info">
        <h2 className="title">Histórico</h2>

        <div className="button-box column">
          <NavBlockButton
            page="../sub/history/solicitacoes"
            image="VSO"
            mode="static"
            column
          />

          <NavBlockButton
            page="../sub/history/relatos"
            image="HRE"
            mode="static"
            column
          />

          <NavBlockButton
            page="../sub/history/sugestoes"
            image="VSU"
            mode="static"
            column
          />

          <NavBlockButton
            page="../sub/history/avaliacoes"
            image="VAV"
            mode="static"
            column
          />
        </div>
      </section>
    </Screen>
  );
}

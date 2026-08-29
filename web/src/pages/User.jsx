import Screen from "../components/Screen";

import api from "../js/api.js";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userData, setUserData] = useState([]);

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
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="name"
              value={userData.name}
              readOnly
            />
          </div>
        </div>
        <div className="camp">
          <div className="output">
            <label htmlFor="classroom">Sala</label>
            <input
              type="text"
              className="classroom"
              value={userData.classroom}
              readOnly
            />
          </div>
          <div className="output">
            <label htmlFor="rm">RM</label>
            <input type="text" className="rm" value={userData.rm} readOnly />
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
    </Screen>
  );
}

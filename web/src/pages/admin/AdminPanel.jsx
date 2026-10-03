import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminScreen from "../../components/AdminScreen.jsx";
import Navbar from "../../components/Navbar.jsx";

import api from "../../js/api.js";
import { textFormatter } from "../../js/utils/textFormatter.js";

import AdminFeedbacks from "./tabs/AdminAvaliacoes.jsx";
import AdminSuggestions from "./tabs/AdminSugestoes.jsx";
import AdminRequests from "./tabs/AdminSolicitacoes.jsx";
import AdminReports from "./tabs/AdminRelatos.jsx";
import AdminUsers from "./tabs/AdminUsuarios.jsx";

export default function AdminPanel() {
  const [userData, setUserData] = useState({});
  const [activeIndex, setActiveIndex] = useState("avaliacoes");

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  return (
    <AdminScreen loading={loading}>
      <header>
        <div className="info">
          <h2 className="name">{userData.name}</h2>
          <p className="id">{userData.rm}</p>
        </div>

        <button className="default" onClick={handleLogout}>
          Sair
        </button>
      </header>

      {userData.type === "gestor" && (
        <Navbar
          admin
          type2
          value={activeIndex}
          onChange={setActiveIndex}
          links={[
            {
              name: "Avaliações",
              path: "avaliacoes",
              icon: "chatbubbles",
            },
            {
              name: "Sugestões",
              path: "sugestoes",
              icon: "rocket",
            },
            {
              name: "Solicitações",
              path: "solicitacoes",
              icon: "alert-circle",
            },
            {
              name: "Relatos",
              path: "relatos",
              icon: "heart",
            },
            {
              name: "Usuários",
              path: "usuarios",
              icon: "people",
            },
          ]}
        />
      )}

      <section>
        <div className="section-header">
          <h1 className="title">
            Painel do {textFormatter.capitalize(userData.type)}
          </h1>

          <img
            src="/src/assets/images/falaetec_logo.png"
            alt="Logotipo do FalaEtec"
          />
        </div>

        {activeIndex === "avaliacoes" && <AdminFeedbacks />}
        {activeIndex === "sugestoes" && <AdminSuggestions />}
        {activeIndex === "solicitacoes" && <AdminRequests />}
        {activeIndex === "relatos" && <AdminReports />}
        {activeIndex === "usuarios" && <AdminUsers />}
      </section>
    </AdminScreen>
  );
}
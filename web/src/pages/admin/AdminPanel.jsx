// Painel de equipe escolar. Carrega o perfil para nomear a sessão, permite
// sair e alterna as listas de interações ou abas de gerenciamento.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminScreen from "../../components/AdminScreen.jsx";
import Navbar from "../../components/Navbar.jsx";

import api from "../../js/api.js";
import { textFormatter } from "../../js/utils/text.formatter.js";

import AdminAvaliacoes from "./tabs/AdminAvaliacoes.jsx";
import AdminSugestoes from "./tabs/AdminSugestoes.jsx";
import AdminSolicitacoes from "./tabs/AdminSolicitacoes.jsx";
import AdminRelatos from "./tabs/AdminRelatos.jsx";
import AdminGerenciamento from "./tabs/AdminGerenciamento.jsx";

export default function AdminPanel() {
  const [userData, setUserData] = useState({});
  const [activeIndex, setActiveIndex] = useState("avaliacoes");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogout() {
    // Encerra a sessão no backend e volta ao login.
    try {
      await api.logout();
      navigate("/sub/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Busca os dados do usuário atual para definir o nome e o tipo do painel.
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
          <h2 className="name">{textFormatter.capitalize(userData.name)}</h2>
          <p className="id">{userData.rm}</p>
        </div>

        <button className="default" onClick={handleLogout}>
          Sair
        </button>
      </header>

      {/* Só o gestor vê a navegação de gerenciamento; professor mantém as listas autorizadas. */}
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
              name: "Gerenciamento",
              path: "gerenciamento",
              icon: "settings",
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

        {/* O valor ativo seleciona um módulo administrativo sem trocar de rota. */}
        {activeIndex === "avaliacoes" && <AdminAvaliacoes />}
        {activeIndex === "sugestoes" && <AdminSugestoes />}
        {activeIndex === "solicitacoes" && <AdminSolicitacoes />}
        {activeIndex === "relatos" && <AdminRelatos />}
        {activeIndex === "gerenciamento" && <AdminGerenciamento />}
      </section>
    </AdminScreen>
  );
}

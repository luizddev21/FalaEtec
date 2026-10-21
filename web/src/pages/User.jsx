// Perfil do usuário autenticado: busca seus dados, oferece logout e, para
// alunos, atalhos para consultar os próprios relatos e demais interações.
import Screen from "../components/Screen";
import NavBlockButton from "../components/NavBlockButton.jsx";

import api from "../js/api.js";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { textFormatter } from "../js/utils/text.formatter.js";

import ColorBlindnessSelector from "../components/ColorBlindnessSelector.jsx";

export default function Home() {
  const [userData, setUserData] = useState({});

  // Loading
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogout() {
    // Encerra os cookies no backend e substitui a tela atual pelo login.
    try {
      await api.logout();
      navigate("/sub/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Consulta o perfil derivado da identidade que veio no token de sessão.
    async function loadUserData() {
      try {
        setLoading(true);

        const response = await api.apiFetch("/user/profile");

        const data = await response.json();

        console.log("data: ", data);

        setUserData(data.user);
        console.log(userData);
      } catch (error) {
        console.error("Erro ao carregar informações do usuário", error);
        // O fluxo prevê guardar a falha, mas setError não é declarado neste componente.
        setError("Erro ao carregar informações do usuário.");
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  function handleNavigate(type) {
    // Passa a categoria selecionada ao histórico sem duplicar sua página.
    navigate(`/interaction/all`, {
      state: { type },
    });
  }

  return (
    <Screen loading={loading}>
      {/* Dados pessoais e ações comuns a todos os tipos de conta. */}
      <section className="user-info">
        <h1 className="title">Informações Pessoais</h1>

        <div className="camp">
          <div className="output">
            <p className="label">Nome</p>
            <p className="value">{textFormatter.capitalize(userData.name)}</p>
          </div>
        </div>

        <div className="camp">
          {userData.type === "aluno" && (
            <div className="output">
              <p className="label">Sala</p>
              <p className="value">{userData.classroom.toUpperCase()}</p>
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

      <section>
        <ColorBlindnessSelector />
      </section>

      {/* O histórico de interações é apresentado apenas a contas de aluno. */}
      {userData.type === "aluno" && (
        <section className="history">
          <h2 className="title">Histórico</h2>

          <div className="button-box column">
            <NavBlockButton
              onClick={() => handleNavigate("solicitacao")}
              image="VSO"
              label="Ver solicitações"
              mode="static"
              column
              button
            />

            <NavBlockButton
              onClick={() => handleNavigate("relato")}
              image="HRE"
              label="Ver relatos"
              mode="static"
              column
              button
            />

            <NavBlockButton
              onClick={() => handleNavigate("sugestao")}
              image="VSU"
              label="Ver sugestões"
              mode="static"
              column
              button
            />

            <NavBlockButton
              onClick={() => handleNavigate("avaliacao")}
              image="VAV"
              label="Ver avaliações"
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

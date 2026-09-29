import AdminScreen from "../../components/AdminScreen";
import api from "../../js/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading.jsx";

export default function Panel() {
  const [userData, setUserData] = useState({});
  const [avList, setAvList] = useState([]);
  const [loading, setLoading] = useState(false);
  let userCount = 0;

  const navigate = useNavigate();

  const type = "avaliacao";
  const limit = 4;

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

  useEffect(() => {
    async function loadInteractionData() {
      const response = await api.apiFetch("/interaction/get-all", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, limit }),
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(response.error);
      }
      setAvList(await response.json());
    }

    try {
      setLoading(true);
      loadInteractionData();
    } catch (error) {
      console.error("Erro ao buscar feedbacks: ", error);
      setError("Erro ao buscar feedbacks");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AdminScreen>
      <header>
        <div className="info">
          <h2 className="name">{userData.name}</h2>
          <p className="id">{userData.rm}</p>
        </div>
        <button className="default">Sair</button>
      </header>
      <section>
        <div className="section-header">
          <h1 className="title">Painel do Professor</h1>
          <img
            src="/src/assets/images/falaetec_logo.png"
            alt="Logotipo do FalaEtec"
          />
        </div>
        <h2 className="title type2">Últimos Feedbacks</h2>
        <ul className="latest-feedback">
          {avList.map((avaliacao) => {
            userCount++;

            const avaliacaoObj = {
              Sobre: avaliacao.titulo,
              Descrição: avaliacao.descricao,
            };

            const props = {
              level: avaliacao.nota,
              userType: userData.type
            };

            const date = new Date(avaliacao.data);
            const formattedDate = date.toLocaleDateString("pt-BR");

            function handleNavigate(obj, props, id) {
              navigate(`/interaction/${id}?type=${type}`, {
                state: { obj, props },
              });
            }

            return (
              <li key={userCount} className="history-card">
                <button
                  onClick={() =>
                    handleNavigate(avaliacaoObj, props, avaliacao.interacao_id)
                  }
                >
                  <div className="info">
                    <h3>{avaliacao.titulo}</h3>
                    <span>Data de envio: {formattedDate}</span>
                  </div>
                  <div className="instruction">
                    <span>Abrir</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="default"
          onClick={() => navigate("/admin/all-feedbacks")}
        >
          Ver mais
        </button>
      </section>
    </AdminScreen>
  );
}

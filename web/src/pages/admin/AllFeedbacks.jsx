import AdminScreen from "../../components/AdminScreen";
import api from "../../js/api.js";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading.jsx";
import { useNavigate } from "react-router-dom";

export default function AllFeedbacks() {
  const [avList, setAvList] = useState([]);
  const [loading, setLoading] = useState(false);
  let userCount = 0;

  const navigate = useNavigate();

  const type = "avaliacao";
  const limit = 0;

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
      <section>
        <div className="section-header">
            
          <h1 className="title"><button className="go-back" onClick={() => navigate(-1)}><ion-icon name="chevron-back-outline"></ion-icon> Voltar</button> Todos os Feedbacks</h1>
          <img
            src="/src/assets/images/falaetec_logo.png"
            alt="Logotipo do FalaEtec"
          />
        </div>
        <ul className="latest-feedback">
          {avList.map((avaliacao) => {
            userCount++;

            const avaliacaoObj = {
              Sobre: avaliacao.titulo,
              Descrição: avaliacao.descricao,
            };

            const props = {
              level: avaliacao.nota,
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
      </section>
    </AdminScreen>
  );
}

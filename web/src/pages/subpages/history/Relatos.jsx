import { useEffect, useState } from "react";
import Screen from "../../../components/Screen";
import api from "../../../js/api.js";
import { useNavigate } from "react-router-dom";

import Loading from "../../../components/Loading";
import Message from "../../../components/Message.jsx";

export default function Relatos() {
  const [reList, setReList] = useState([]);
  let userCount = 0;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const type = "relato";

  useEffect(() => {
    async function loadInteractionData() {
      const response = await api.apiFetch("/interaction/get-all", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(response.error);
      }
      setReList(await response.json());
    }

    try {
      setLoading(true);
      loadInteractionData();
    } catch (error) {
      console.error("Erro ao buscar interações: ", error);
      setError("Erro ao buscar interações");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleNavigate(obj, props, id) {
    navigate(`/interaction/${id}?type=${type}`, {
      state: { obj, props },
    });
  }

  return (
    !loading ?
    <Screen>
      { error !== "" && <Message type="error" message={error} /> }
      <section>
        <ul className="history-list">
          {reList.map((relato) => {
            userCount++;

            const relatoObj = {
              Sobre: relato.titulo,
              "Quando aconteceu": relato.aconteceu,
              "Relato anônimo": relato.anonimo === 1 ? "Sim" : "Não",
              "Precisa de acompanhamento":
                relato.acompanhamento === 1 ? "Sim" : "Não",
              Descrição: relato.descricao,
            };

            const date = new Date(relato.data);
            const formattedDate = date.toLocaleDateString("pt-BR");

            return (
              <li key={userCount} className="history-card">
                <button
                  onClick={() =>
                    handleNavigate(relatoObj, null, relato.interacao_id)
                  }
                >
                  <div className="info">
                    <h3>Sobre: {relato.titulo}</h3>
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
    </Screen> : <Loading />
  );
}

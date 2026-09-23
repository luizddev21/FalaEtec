import { useEffect, useState } from "react";
import Screen from "../../../components/Screen.jsx";
import api from "../../../js/api.js";
import { useNavigate } from "react-router-dom";

export default function Solicitações() {
  const [soList, setReList] = useState([]);
  let userCount = 0;

  const navigate = useNavigate();

  const type = "solicitacao";

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
        console.error(response.error);
      }
      setReList(await response.json());
      console.log(soList);
    }

    loadInteractionData();
  }, []);

  function handleNavigate(obj, id) {
    navigate(`/interaction/${id}?type=${type}`, {
      state: { obj },
    });
  }

  return (
    <Screen>
      <section>
        <ul className="history-list">
          {soList.map((solicitacao) => {
            userCount++;

            const solicitacaoObj = {
                "Título": solicitacao.titulo,
                "Local": `${solicitacao.local} - ${solicitacao.sub_local}`,
                "Descrição": solicitacao.descricao,
            }

            const date = new Date(solicitacao.data);
            const formattedDate = date.toLocaleDateString("pt-BR")

            return (
              <li key={userCount} className="history-card">
                <button onClick={() => handleNavigate(solicitacaoObj, solicitacao.interacao_id)}>
                  <div className="info">
                    <h3>{solicitacao.titulo}</h3>
                    <span>Data de envio: {formattedDate}</span>
                  </div>
                  <div className="instruction">
                    <span>Abrir</span>
                  </div>
                </button>
              </li>
            );
          })
        }
        </ul>
      </section>
    </Screen>
  );
}

import { useEffect, useState } from "react";
import Screen from "../../../components/Screen";
import api from "../../../js/api.js";
import { useNavigate } from "react-router-dom";

export default function Avaliacoes() {
  const [avList, setAvList] = useState([]);
  let userCount = 0;

  const navigate = useNavigate();

  const type = "avaliacao";

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
      setAvList(await response.json());
      console.log(avList);
    }

    loadInteractionData();
  }, []);

  function handleNavigate(obj, props, id) {
    navigate(`/interaction/${id}?type=${type}`, {
      state: { obj, props },
    });
  }

  return (
    <Screen>
      <section>
        <ul className="history-list">
          {avList.map((avaliacao) => {
            userCount++;

            const avaliacaoObj = {
                "Sobre": avaliacao.titulo,
                "Descrição": avaliacao.descricao
            }

            const props = {
                level: avaliacao.nota
            }

            const date = new Date(avaliacao.data);
            const formattedDate = date.toLocaleDateString("pt-BR")

            return (
              <li key={userCount} className="history-card">
                <button onClick={() => handleNavigate(avaliacaoObj, props, avaliacao.interacao_id)}>
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
          })
        }
        </ul>
      </section>
    </Screen>
  );
}

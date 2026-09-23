import { useEffect, useState } from "react";
import Screen from "../../../components/Screen";
import api from "../../../js/api.js";
import { useNavigate } from "react-router-dom";

export default function Sugestoes() {
  const [suList, setReList] = useState([]);
  let userCount = 0;

  const navigate = useNavigate();

  const type = "sugestao";

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
      console.log(suList);
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
          {suList.map((sugestao) => {
            userCount++;

            const sugestaoObj = {
                "Sobre": sugestao.titulo,
                "Descrição": sugestao.descricao
            }

            const date = new Date(sugestao.data);
            const formattedDate = date.toLocaleDateString("pt-BR")

            return (
              <li key={userCount} className="history-card">
                <button onClick={() => handleNavigate(sugestaoObj, sugestao.interacao_id)}>
                  <div className="info">
                    <h3>{sugestao.titulo}</h3>
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

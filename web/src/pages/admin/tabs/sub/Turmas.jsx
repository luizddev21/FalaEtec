import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { textFormatter } from "../../../../js/utils/text.formatter";

import api from "../../../../js/api";

export default function Turmas() {
  const navigate = useNavigate();

  // Pegando usuários

  const [turmaData, setTurmaData] = useState([]);

  async function loadTurmaData() {
    try {
      const data = await api.getAllTurma();
      setTurmaData(data);
    } catch (error) {
      console.error("Erro ao tentar pegar as informações dos turmas: ", error);
    }
  }

  useEffect(() => {
    loadTurmaData();
  }, []);

  function handleNavigate(obj) {
    navigate(`./manage-turma`, {
      state: obj,
    });
  }

  async function handleDelete(turma_id) {
    try {
      await api.deleteTurma(turma_id);
      loadTurmaData();
    } catch (error) {
      console.error("Erro ao tentar apagar turma: ", error);
    }
  }

  return (
    <div className="admin-tab">
      <div className="toolbar">
        <button
          className="default addTurma"
          onClick={() => navigate("./add-turma")}
        >
          Adicionar Turma
        </button>
      </div>
      <h2 className="title type2">Todos as turmas</h2>
      <ul>
        {turmaData.map((turma) => {
          const turmaObj = {
            id: turma.turma_id,
            classroom: turma.classe,
            course: turma.course,
          };

          return (
            <li className="user" key={`${Math.random() * 10}`}>
              <div className="info">
                <h2>{turma.classe.toUpperCase()}</h2>
                <p>{turma.curso}</p>
                <p>{textFormatter.capitalize(turma.turma_id)}</p>
              </div>
              <div className="tools">
                <button
                  className="default"
                  onClick={() => handleNavigate(turmaObj)}
                >
                  <ion-icon name="pencil"></ion-icon>
                </button>
                <button
                  className="danger"
                  onClick={() => handleDelete(turma.turma_id)}
                >
                  <ion-icon name="trash-bin"></ion-icon>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Lista cursos ativos e oferece criação, edição e desativação pelo painel.
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { textFormatter } from "../../../../js/utils/text.formatter";

import api from "../../../../js/api";

export default function Cursos() {
  const navigate = useNavigate();

  // Pegando usuários

  const [cursoData, setCursoData] = useState([]);

  async function loadCursoData() {
    // Busca os cursos que o serviço considera ativos.
    try {
      const data = await api.getAllCurso();
      setCursoData(data);
    } catch (error) {
      console.error("Erro ao tentar pegar as informações dos cursos: ", error);
    }
  }

  useEffect(() => {
    loadCursoData();
  }, []);

  function handleNavigate(obj) {
    // Transfere a chave e os dados do curso ao formulário de edição.
    navigate(`./manage-curso`, {
      state: obj,
    });
  }

  async function handleDelete(curso_id) {
    // A API desativa o curso e a consulta seguinte atualiza a lista.
    try {
      await api.deleteCurso(curso_id);
      loadCursoData();
    } catch (error) {
      console.error("Erro ao tentar apagar curso: ", error);
    }
  }

  return (
    <div className="admin-tab">
      <div className="toolbar">
        <button
          className="default addCurso"
          onClick={() => navigate("./add-curso")}
        >
          Adicionar Curso
        </button>
      </div>
      <h2 className="title type2">Todos os cursos</h2>
      <ul>
        {cursoData.map((curso) => {
          const cursoObj = {
            id: curso.curso_id,
            name: curso.name
          };

          return (
            <li className="user" key={`${Math.random() * 10}`}>
              <div className="info">
                <h2>{textFormatter.capitalize(curso.nome)}</h2>
                <p>{curso.curso_id}</p>
              </div>
              <div className="tools">
                <button
                  className="default"
                  aria-label={`Editar curso ${curso.nome}`}
                  onClick={() => handleNavigate(cursoObj)}
                >
                  <ion-icon name="pencil"></ion-icon>
                </button>
                <button
                  className="danger"
                  aria-label={`Excluir curso ${curso.nome}`}
                  onClick={() => handleDelete(curso.curso_id)}
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

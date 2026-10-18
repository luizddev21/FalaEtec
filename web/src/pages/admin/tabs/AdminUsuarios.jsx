import api from "../../../js/api.js";
import { useEffect, useState } from "react";
import { textFormatter } from "../../../js/utils/text.formatter.js";
import "../../../assets/stylesheets/pages/adminUsuarios.css";

export default function AdminUsuarios() {
  // Pegando usuários

  const [allUserData, setAllUserData] = useState([]);

  useEffect(() => {
    async function loadAllUserData() {
      try {
        const data = await api.getAllUsers();
        setAllUserData(data);
      } catch (error) {
        console.error(
          "Erro ao tentar pegar as informações dos usuários: ",
          error,
        );
      }
    }

    loadAllUserData();
  }, []);

  return (
    <div className="admin-tab feedbacks">
      <h2 className="title type2">Todos os usuários</h2>
      <ul>
        {allUserData.map((user) => {
          return (
            <li className="user">
              <div className="info">
                <h2>{textFormatter.capitalize(user.nome)}</h2>
                <p>
                  {user.type === "aluno"
                    ? user.aluno_id
                    : user.type === "professor"
                      ? user.professor_id
                      : user.gestor_id}
                </p>
                <p>{user.classe}</p>
                <p>{textFormatter.capitalize(user.type)}</p>
              </div>
              <div className="tools">
                <button className="default">Trocar Senha</button>
                <button
                  className="danger"
                  onClick={() =>
                    api.deleteUser(
                      user.type === "aluno"
                        ? user.aluno_id
                        : user.type === "professor"
                          ? user.professor_id
                          : user.gestor_id,
                      user.type,
                    )
                  }
                >
                  Apagar Usuário
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Lista contas recebidas da API, navega para edição com o registro selecionado
// e confirma/após excluir atualiza os resultados exibidos.
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { textFormatter } from "../../../../js/utils/text.formatter";

import api from "../../../../js/api";

export default function Users() {
  const navigate = useNavigate();

  // Pegando usuários

  const [allUserData, setAllUserData] = useState([]);

  async function loadAllUserData() {
    // Atualiza os dados da lista depois da carga inicial ou de uma exclusão.
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

  useEffect(() => {
    loadAllUserData();
  }, []);

  function handleNavigate(obj) {
    // O registro viaja em location.state para preencher o formulário de edição.
    navigate(`./manage-user`, {
      state: obj,
    });
  }

  async function handleDelete(rm, type) {
    // A API pede confirmação, exclui pelo tipo/identificador e recarrega a lista.
    try {
      await api.deleteUser(rm, type);
      await loadAllUserData();
    } catch (error) {
      console.error("Erro ao tentar apagar usuário: ", error);
    }
  }

  return (
    <div className="admin-tab">
      <div className="toolbar">
        <button
          className="default addUser"
          onClick={() => navigate("./add-user")}
        >
          Adicionar Usuário
        </button>
      </div>
      <h2 className="title type2">Todos os usuários</h2>
      <ul>
        {allUserData.map((user) => {
          const userObj = {
            nome: user.nome,
            classe: user.classe,
            rm:
              user.type === "aluno"
                ? user.aluno_id
                : user.type === "professor"
                  ? user.professor_id
                  : user.gestor_id,
            type: user.type,
          };

          return (
            <li className="user" key={`${user.type}-${user.name}`}>
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
                <button
                  className="default"
                  aria-label={`Editar usuário ${user.nome}`}
                  onClick={() => handleNavigate(userObj)}
                >
                  <ion-icon name="pencil"></ion-icon>
                </button>
                <button
                  className="danger"
                  aria-label={`Excluir usuário ${user.nome}`}
                  onClick={() =>
                    handleDelete(
                      user.type === "aluno"
                        ? user.aluno_id
                        : user.type === "professor"
                          ? user.professor_id
                          : user.gestor_id,
                      user.type,
                    )
                  }
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

import AdminScreen from "../../../components/AdminScreen.jsx";
import api from "../../../js/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminUsuarios() {

  // Pegando usuários

  const [allUserData, setAllUserData] = useState([]);

  useEffect(() => {
    async function loadAllUserData() {
      try {
        const data = await api.getAllUsers();
        setAllUserData(data);
      } catch (error) {
        console.error("Erro ao tentar pegar as informações dos usuários: ", error);
      }
    }

    loadAllUserData();
  }, []);

  return (
    <div className="admin-tab feedbacks">
      <h2 className="title type2">Todos os usuários</h2>
      <ul>
        {allUserData.map((user) => {
;          return(
            <li className="user">
              <span>{user.nome}</span>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

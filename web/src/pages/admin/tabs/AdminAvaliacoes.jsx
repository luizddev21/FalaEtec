import AdminScreen from "../../../components/AdminScreen.jsx";
import api from "../../../js/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAvaliacoes() {
  // TODO: Pegar todos os feedbacks dos usuários

  const [interactionData, setInteractionData] = useState([]);

  const [filters, setFilters] = useState({
    classe: "",
    search: "",
  });

  const navigate = useNavigate();

  // Error
  const [error, setError] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(4);

  useEffect(() => {
    async function loadInteractionData() {
      try {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== "") {
            params.append(key, value);
          }
        });

        setLoading(true);

        const data = await api.getAllInteraction(
          "avaliacao",
          limit,
          params.toString(),
        );

        setInteractionData(data);
      } catch (error) {
        console.error("Erro ao buscar avaliações: ", error);
        setError("Erro ao buscar avaliações");
      } finally {
        setLoading(false);
      }
    }

    loadInteractionData();
  }, [limit, filters]);

  function handleSeeAll() {
    if (limit > 0) {
      setLimit(0);
    } else {
      setLimit(4);
    }
  }

  //
  //    SISTEMA DE FILTRAGEM
  //

  function handleChange(e) {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });

    console.log(filters);
  }

  // Pegando todas as turmas

  const [turmaData, setTurmaData] = useState([]);

  useEffect(() => {
    async function loadTurmaData() {
      try {
        setLoading(true);

        const data = await api.getAllTurma();

        setTurmaData(data);
      } catch (error) {
        console.error("Erro ao buscar avaliações: ", error);
        setError("Erro ao buscar avaliações");
      } finally {
        setLoading(false);
      }
    }

    loadTurmaData();
  }, []);

  // Todas as classes
  const uniqueClasses = [...new Set(turmaData.map((turma) => turma.classe))];

  // Abrindo interações

  function handleNavigate(obj, props, id) {
    navigate(`/interaction/${id}?type=avaliacao`, {
      state: { obj, props },
    });
  }

  return (
    <div className="admin-tab feedbacks">
      <h2 className="title type2">
        {limit > 0 ? "Últimas avaliações" : "Todas as avaliações"}
      </h2>

      <nav>
        <div className="search-input">
          <ion-icon name="search"></ion-icon>
          <input
            onChange={handleChange}
            value={filters.search}
            name="search"
            type="search"
            className="search"
            placeholder="Pesquisar..."
          />
        </div>

        <div className="filters">
          <select
            onChange={handleChange}
            value={filters.classe}
            name="classe"
            id="clasee"
          >
            <option value="" disabled>
              Classe
            </option>

            {uniqueClasses.map((classe) => (
              <option key={classe} value={classe}>
                {classe}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <ul>
        {interactionData.map((interaction) => {
          let interactionObj = {
            Aluno: interaction?.aluno_nome,
            Classe: interaction?.classe,
            Sobre: interaction?.titulo,
            Descrição: interaction?.descricao,
            Resposta: interaction?.resposta
          };

          const props = {
            level: interaction?.nota
          };

          const date = new Date(interaction.data);
          const formattedDate = date.toLocaleDateString("pt-BR");

          return (
            <li
              key={interaction.interacao_id}
              className="history-card"
              onClick={() =>
                handleNavigate(interactionObj, props, interaction.interacao_id)
              }
            >
              <button>
                <div className="info">
                  <h3>{`${interaction.aluno_nome} - ${interaction.classe}`}</h3>
                  <span>Data de envio: {formattedDate}</span>
                  <span>Sobre: {interaction.titulo}</span>
                </div>
                <div className="instruction">
                  <span>Abrir</span>
                </div>
              </button>
            </li>
          );
        })}
        <button className="default" onClick={handleSeeAll}>
          {limit > 0 ? "Ver todos" : "Ver menos"}
        </button>
      </ul>
    </div>
  );
}

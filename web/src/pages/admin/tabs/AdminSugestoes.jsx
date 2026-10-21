// Lista sugestões enviadas por alunos, com busca/filtro por turma e atalho
// para abrir os dados completos de cada sugestão.
import api from "../../../js/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { textFormatter } from "../../../js/utils/text.formatter.js";

export default function AdminFeedbacks() {
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

  // Reconsulta os dados quando os filtros ou a quantidade exibida se alteram.
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
          "sugestao",
          limit,
          params.toString(),
        );

        setInteractionData(data);
      } catch (error) {
        console.error("Erro ao buscar sugestões: ", error);
        setError("Erro ao buscar sugestões");
      } finally {
        setLoading(false);
      }
    }

    loadInteractionData();
  }, [limit, filters]);

  // Alterna a quantidade de itens solicitada ao backend.
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

  // Mantém a busca e a turma selecionadas como filtros controlados.
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

  // Carrega as turmas existentes para compor as opções de filtro.
  useEffect(() => {
    async function loadTurmaData() {
      try {
        setLoading(true);

        const data = await api.getAllTurma();

        setTurmaData(data);
      } catch (error) {
        console.error("Erro ao buscar classes: ", error);
        setError("Erro ao buscar classes");
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
    navigate(`/interaction/${id}?type=sugestao`, {
      state: { obj, props },
    });
  }

  return (
    <div className="admin-tab feedbacks">
      <h2 className="title type2">
        {limit > 0 ? "Últimas sugestões" : "Todas as sugestões"}
      </h2>

      <nav aria-label="Pesquisar e filtrar sugestões">
        <div className="search-input">
          <ion-icon name="search"></ion-icon>
          <input
            onChange={handleChange}
            value={filters.search}
            name="search"
            type="search"
            className="search"
            placeholder="Pesquisar..."
            aria-label="Pesquisar sugestões"
          />
        </div>

        <div className="filters">
          <select
            aria-label="Filtrar sugestões por turma"
            onChange={handleChange}
            value={filters.classe}
            name="classe"
            id="clasee"
          >
            <option value="">
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
        {/* Cada cartão leva ao detalhe com dados já formatados para apresentação. */}
        {interactionData.map((interaction) => {
          let interactionObj = {
            Aluno: interaction?.aluno_nome,
            Classe: interaction?.classe,
            Sobre: interaction?.titulo,
            Descrição: interaction?.descricao,
            Resposta: interaction?.resposta
          };

          const props = {
            level: interaction?.nota,
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
                  <h3>Sobre: {textFormatter.capitalize(interaction.titulo)}</h3>
                  <span>Data de envio: {formattedDate}</span>
                  <span>Classe: {interaction.classe.toUpperCase()}</span>
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

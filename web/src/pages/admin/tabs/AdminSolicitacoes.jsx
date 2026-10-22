// Lista solicitações para equipe: combina busca, filtro de turma/status, limite
// inicial e acesso ao detalhe, onde a resposta administrativa é enviada.
import AdminScreen from "../../../components/AdminScreen.jsx";
import api from "../../../js/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { textFormatter } from "../../../js/utils/text.formatter.js";

export default function AdminSolicitacoes() {
  // TODO: Pegar todos os feedbacks dos usuários

  const [interactionData, setInteractionData] = useState([]);

  const [filters, setFilters] = useState({
    classe: "",
    status: "",
    search: "",
  });

  const navigate = useNavigate();

  // Error
  const [error, setError] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(4);

  // Busca novamente os registros quando filtros ou limite da lista mudam.
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
          "solicitacao",
          limit,
          params.toString(),
        );

        setInteractionData(data);
      } catch (error) {
        console.error("Erro ao buscar solicitações: ", error);
        setError("Erro ao buscar solicitações");
      } finally {
        setLoading(false);
      }
    }

    loadInteractionData();
  }, [limit, filters]);

  // Alterna entre itens recentes e todos os resultados.
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

  // Atualiza um dos filtros controlados e provoca nova consulta via useEffect.
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

  // Carrega turmas para popular o filtro por classe.
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
    navigate(`/interaction/${id}?type=solicitacao`, {
      state: { obj, props },
    });
  }

  return (
    <div className="admin-tab">
      <h2 className="title type2">
        {limit > 0 ? "Últimas solicitações" : "Todas as solicitações"}
      </h2>

      <nav aria-label="Pesquisar e filtrar solicitações">
        <div className="search-input">
          <ion-icon name="search"></ion-icon>
          <input
            onChange={handleChange}
            value={filters.search}
            name="search"
            type="search"
            className="search"
            placeholder="Pesquisar..."
            aria-label="Pesquisar solicitações"
          />
        </div>

        <div className="filters">
          <select
            aria-label="Filtrar solicitações por turma"
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
          <select
            aria-label="Filtrar solicitações por status"
            onChange={handleChange}
            value={filters.status}
            name="status"
            id="status"
          >
            <option value="">
              Status
            </option>

            <option value="pendente">Pendente</option>
            <option value="rejeitado">Rejeitado</option>
            <option value="concluido">Concluido</option>
          </select>
        </div>
      </nav>

      <ul>
        {/* O modo recente mostra apenas pendentes; o modo completo mostra todos. */}
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
            urlImg: interaction?.url_img,
            status: interaction?.status
          };

          const date = new Date(interaction.data);
          const formattedDate = date.toLocaleDateString("pt-BR");

          return limit > 0 ? (
            interaction.status === "pendente" && (
              <li
                key={interaction.interacao_id}
                className="history-card"
                onClick={() =>
                  handleNavigate(
                    interactionObj,
                    props,
                    interaction.interacao_id,
                  )
                }
              >
                <button>
                  <div className="info">
                    <h3>{`${textFormatter.capitalize(interaction.aluno_nome)} - ${interaction.classe.toUpperCase()}`}</h3>
                    <span>Data de envio: {formattedDate}</span>
                    <span>Sobre: {textFormatter.capitalize(interaction.titulo)}</span>
                  </div>
                  <div className="instruction column">
                  <span className={interaction.status}>{textFormatter.capitalize(interaction.status)}</span>
                    <span>Abrir</span>
                  </div>
                </button>
              </li>
            )
          ) : (
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
                <div className="instruction column">
                  <span className={interaction.status}>{textFormatter.capitalize(interaction.status)}</span>
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

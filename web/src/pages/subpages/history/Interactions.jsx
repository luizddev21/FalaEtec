// Lista o histórico da categoria escolhida na página de perfil. Cada cartão
// monta um resumo e encaminha os dados necessários à página de detalhes.
import { useEffect, useState } from "react";
import Screen from "../../../components/Screen";
import api from "../../../js/api.js";
import { useNavigate, useLocation } from "react-router-dom";
import HistoryCard from "../../../components/HistoryCard.jsx";

import { textFormatter } from "../../../js/utils/text.formatter.js";

export default function Interacions() {
    const [interactionData, setInteractionData] = useState([]);

    // A categoria chega pela navegação interna do perfil.
    const { state } = useLocation();
    const type = state ? state.type : null;

    // Error
    const [error, setError] = useState("");

    // Loading
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Busca registros próprios; o servidor usa a categoria para filtrar a consulta.
        async function loadInteractionData() {
            try {
                setLoading(true);

                const data = await api.getAllInteraction(type);

                setInteractionData(data);
            } catch (error) {
                console.error("Erro ao buscar interações: ", error);
                setError("Erro ao buscar interações")
            } finally {
                setLoading(false);
            }

        }

        loadInteractionData();
    }, []);

    function handleNavigate(obj, props, id) {
        // Envia resumo, propriedades adicionais e identificador para a tela de detalhe.
        navigate(`/interaction/${id}?type=${type}`, {
            state: { obj, props },
        });
    }

    return (
        <Screen loading={loading} message={{ type: "error", message: error }}>
            <section>
                <h1 className="visually-hidden">Histórico de interações</h1>
                {/* Relatos têm campos adicionais; as demais categorias usam o resumo comum. */}
                <ul className="history-list">
                    {interactionData.map((interacao) => {

                        console.log(interacao.status)

                        let interacaoObj

                        if (type === "relato") {
                            interacaoObj = {
                                Sobre: interacao?.titulo,
                                Descrição: interacao?.descricao,
                                "Quando aconteceu": interacao?.aconteceu,
                                "Relato anônimo":
                                    interacao?.anonimo === 1 ? "Sim" : "Não",
                                "Precisa de acompanhamento":
                                    interacao?.acompanhamento === 1 ? "Sim" : "Não",
                                Local: interacao?.local !== null 
                                    ? `${interacao?.local} - ${interacao?.sub_local}` 
                                    : null,
                                Resposta: interacao?.resposta,
                            };
                        }  else {
                            interacaoObj = {
                                Sobre: interacao?.titulo,
                                Descrição: interacao?.descricao,
                                Local: interacao?.local !== null 
                                    ? `${interacao?.local} - ${interacao?.sub_local}` 
                                    : null,
                                Resposta: interacao?.resposta
                            };
                        }

                        const props = {
                            level: interacao?.nota,
                            urlImg: interacao?.url_img,
                        };

                        const date = new Date(interacao?.data);
                        const formattedDate = date.toLocaleDateString("pt-BR");

                        return (
                            <HistoryCard
                                onClick={() =>
                                    handleNavigate(interacaoObj, props, interacao.interacao_id)
                                }
                                key={interacao.interacao_id}
                            >
                                <div className="info">
                                    <h3>{textFormatter.capitalize(interacao?.titulo)}</h3>
                                    <span>Data de envio: {formattedDate}</span>
                                </div>
                                <div className="instruction">
                                    <span>Abrir</span>
                                </div>
                            </HistoryCard>
                        );
                    })}
                </ul>
            </section>
        </Screen>
    )
}

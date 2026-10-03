import { useEffect, useState } from "react";
import Screen from "../../../components/Screen";
import api from "../../../js/api.js";
import { useNavigate, useLocation } from "react-router-dom";
import HistoryCard from "../../../components/HistoryCard.jsx";

export default function Interacions() {
    const [interactionData, setInteractionData] = useState([]);

    const { state } = useLocation();
    const type = state ? state.type : null;

    // Error
    const [error, setError] = useState("");

    // Loading
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
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
        navigate(`/interaction/${id}?type=${type}`, {
            state: { obj, props },
        });
    }

    return (
        <Screen loading={loading} message={{ type: "error", message: error }}>
            <section>
                <ul className="history-list">
                    {interactionData.map((interacao) => {

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
                                Local: interacao?.local !== null ? `${interacao?.local} - ${interacao?.sub_local}` : null,
                                Resposta: interacao.resposta
                            };
                        } else {
                            interacaoObj = {
                                Sobre: interacao?.titulo,
                                Descrição: interacao?.descricao,
                                Local: interacao?.local !== null ? `${interacao?.local} - ${interacao?.sub_local}` : null,
                                Resposta: interacao.resposta
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
                                    <h3>{interacao?.titulo}</h3>
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

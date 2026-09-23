import { useEffect, useState } from "react";
import Screen from "../../../components/Screen";
import api from "../../../js/api.js"
import { useNavigate } from "react-router-dom";

export default function Relatos() {
    const [reList, setReList] = useState([]);
    let userCount = 0;

    const navigate = useNavigate();

    const type = "relato";

    class Relato {
        constructor(title, type, desc, itHappened, anonymous, attendance) {
            this.title = title,
            this.type = type,
            this.desc = desc,
            this.itHappened = itHappened,
            this.anonymous = anonymous,
            this.attendance = attendance
        }
    }

    useEffect(() => {
        async function loadInteractionData() {
            const response = await api.apiFetch("/interaction/get-all", {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ type }),
                method: "POST"
            });

            if (!response.ok) {
                console.error(response.error);
            }
            setReList(await response.json());
            console.log(reList);
        }

        loadInteractionData();


    }, []);


    return (
        <Screen>
            <section>
                <ul className="history-list">
                    {
                        reList.map((relato) => {
                            userCount++;

                            const relatoObj = new Relato(
                                relato.titulo,
                                relato.tipo,
                                relato.descricao,
                                relato.aconteceu,
                                relato.anonimo,
                                relato.acompanhamento
                            )

                            return (
                                <li 
                                    key={userCount} 
                                    className="history-card"
                                    onClick={navigate(`../sub/interaction/${relato.interacao_id}`, {
                                        state: { relatoObj }
                                    })}
                                >
                                    <div className="info">
                                        <h3>Sobre: {relato.titulo}</h3>
                                        <span>Quando aconteceu: {relato.aconteceu}</span>
                                    </div>
                                    <div className="instruction">
                                        <span>Abrir</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </Screen>
    )
}
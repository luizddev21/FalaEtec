import Screen from "../../components/Screen";
import { useState } from "react";

import api from "../../js/api.js";

export default function Relato() {
    const page = "relato";

    const [step, setStep] = useState(0);

    const [form, setForm] = useState({
        title: "",
        desc: "",
        date: "",
        attendance: 0,
        anonymous: 0
    });

    const handleChange = (name, value) => {
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const nextStep = (name, value) => {
        handleChange(name, value);
        setStep(prev => prev + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("desc", form.desc);
        formData.append("date", form.date);
        formData.append("attendance", form.attendance);
        formData.append("anonymous", form.anonymous);
        formData.append("type", page);

        return await api.createInteraction(formData);
    };

    return (
        <Screen>
            <section>
                <form onSubmit={handleSubmit} className="type3">

                    {/* PERGUNTA 1 */}
                    {step === 0 && (
                        <div className="camp">
                            <div className="input">

                                <label>
                                    Gostaria que o seu relato fosse anônimo?
                                </label>

                                <span className="warning">
                                    Caso seja necessário podemos verificar sua identidade,
                                    porém ao saber que o relato é anônimo você fica seguro
                                    de qualquer revelação ou algo relacionado à você.
                                </span>

                                <button
                                    type="button"
                                    onClick={() => nextStep("anonymous", 1)}
                                >
                                    Sim
                                </button>

                                <button
                                    type="button"
                                    onClick={() => nextStep("anonymous", 0)}
                                >
                                    Não
                                </button>

                            </div>
                        </div>
                    )}

                    {/* PERGUNTA 2 */}
                    {step === 1 && (
                        <div className="camp">
                            <div className="input">

                                <label>
                                    Sobre quem é o relato?
                                </label>

                                <button
                                    type="button"
                                    onClick={() => nextStep("title", "professor")}
                                >
                                    Professor
                                </button>

                                <button
                                    type="button"
                                    onClick={() => nextStep("title", "aluno")}
                                >
                                    Aluno
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        nextStep("title", "funcionário/servidor")
                                    }
                                >
                                    Funcionário/Servidor
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        nextStep("title", "outro")
                                    }
                                >
                                    Outro
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        nextStep("title", "prefiro não informar")
                                    }
                                >
                                    Prefiro não informar
                                </button>

                            </div>
                        </div>
                    )}

                    {/* PERGUNTA 2.5 - SOMENTE SE ESCOLHER OUTRO */}
                    {step === 2 && form.title === "outro" && (
                        <div className="camp">
                            <div className="input">

                                <label htmlFor="otherTitle">
                                    Sobre quem é o relato?
                                </label>

                                <input
                                    type="text"
                                    id="otherTitle"
                                    value={form.title === "outro" ? "" : form.title}
                                    onChange={(e) =>
                                        handleChange("title", e.target.value)
                                    }
                                    placeholder="Digite aqui..."
                                    autoFocus
                                />

                                <button
                                    type="button"
                                    onClick={() => setStep(prev => prev + 1)}
                                    disabled={!form.title.trim() || form.title === "outro"}
                                >
                                    Continuar
                                </button>

                            </div>
                        </div>
                    )}

                    {/* DESCRIÇÃO */}
                    {(
                        (step === 2 && form.title !== "outro") ||
                        (step === 3 && form.title !== "outro") ||
                        (step === 3 && form.title !== "outro")
                    ) && (
                            <div className="camp">
                                <div className="input">

                                    <label htmlFor="desc">
                                        Pode nos contar o que aconteceu?
                                    </label>

                                    <textarea
                                        value={form.desc}
                                        onChange={(e) =>
                                            handleChange("desc", e.target.value)
                                        }
                                        name="desc"
                                        id="desc"
                                        placeholder="Escreva aqui..."
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setStep(prev => prev + 1)}
                                    >
                                        Continuar
                                    </button>

                                </div>
                            </div>
                        )}

                    {/* DATA - QUANDO É OUTRO */}
                    {step === 4 && form.title !== "outro" && (
                        <div className="camp">
                            <div className="input">

                                <label>
                                    Quando isso aconteceu?
                                </label>

                                <button
                                    type="button"
                                    onClick={() => nextStep("date", "hoje")}
                                >
                                    Hoje
                                </button>

                                <button
                                    type="button"
                                    onClick={() => nextStep("date", "ontem")}
                                >
                                    Ontem
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        nextStep("date", "há mais tempo")
                                    }
                                >
                                    Há mais tempo
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        nextStep(
                                            "date",
                                            "prefiro não informar"
                                        )
                                    }
                                >
                                    Prefiro não informar
                                </button>

                            </div>
                        </div>
                    )}

                    {/* DATA - NORMAL */}
                    {step === 3 && form.title === "outro" && (
                        <div className="camp">
                            <div className="input">

                                <label>
                                    Quando isso aconteceu?
                                </label>

                                <button
                                    type="button"
                                    onClick={() => nextStep("date", "hoje")}
                                >
                                    Hoje
                                </button>

                                <button
                                    type="button"
                                    onClick={() => nextStep("date", "ontem")}
                                >
                                    Ontem
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        nextStep("date", "há mais tempo")
                                    }
                                >
                                    Há mais tempo
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        nextStep(
                                            "date",
                                            "prefiro não informar"
                                        )
                                    }
                                >
                                    Prefiro não informar
                                </button>

                            </div>
                        </div>
                    )}

                    {/* ACOMPANHAMENTO */}
                    {(
                        (step === 4 && form.title === "outro") ||
                        (step === 5 && form.title !== "outro")
                    ) && form.anonymous === 0 && (
                            <div className="camp">
                                <div className="input">

                                    <label>
                                        Gostaria de acompanhamento?
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            nextStep("attendance", 1)
                                        }
                                    >
                                        Sim
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            nextStep("attendance", 0)
                                        }
                                    >
                                        Não
                                    </button>

                                </div>
                            </div>
                        )}

                    {/* ENVIAR */}
                    {(
                        (step === 5 && form.title === "outro") ||
                        (step === 5 && form.title !== "outro" && form.anonymous === 1) ||
                        (step === 6 && form.title !== "outro")
                    ) && (
                            <div className="camp">
                                <button type="submit">
                                    Enviar relato
                                </button>
                            </div>
                        )}

                </form>
            </section>
        </Screen>
    );
}
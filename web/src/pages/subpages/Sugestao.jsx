import Screen from "../../components/Screen";
import { useEffect, useState } from "react";

export default function Interaction() {

    // Lógica de envio de formulário

    const [form, setForm] = useState({

    })

    return (
        <Screen>
            <section>
                <form action="" className="type2">
                    <h2 className="title">Faça a sua sugestão!</h2>
                    <div className="camp">
                        <div className="input">
                            <input type="text" name="title" id="title" required />
                            <label htmlFor="title">Qual a sua ideia?</label>
                        </div>
                    </div>
                    <div className="camp">
                        <div className="input textarea">
                            <textarea name="desc" id="desc" required></textarea>
                            <label htmlFor="desc">Descreva sua ideia!</label>
                        </div>
                    </div>
                    <div className="camp">
                        <div className="input">
                            <button className="default">Enviar</button>
                        </div>
                    </div>
                </form>
            </section>
        </Screen>
    );
}
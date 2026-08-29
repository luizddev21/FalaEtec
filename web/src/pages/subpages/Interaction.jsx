import Screen from "../../components/Screen";
import Rating from "@mui/material/Rating";
import { useState } from "react";

import { useSearchParams } from "react-router-dom";

export default function Interaction() {
  const [value, setValue] = useState(3);
    const [searchParams] = useSearchParams();

  const page = searchParams.get("type");

  return (
    <Screen>
      <section>
        <form action="" className="type2">
          {page === "avaliacao" ? (
            <>
              <h2 className="title">Nos dê o seu feedback!</h2>
              <div className="camp">
                <div className="input">
                  <select name="title" id="title" defaultValue="" required>
                    <option value="" disabled>
                      Sobre quem é a avaliação?
                    </option>
                    <option value="professor">Professor</option>
                    <option value="escola">Escola</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              <div className="camp">
                <div className="input">
                  <input type="text" name="title" id="title" required />
                  <label htmlFor="title">Sobre quem?</label>
                </div>
              </div>
              <h2 className="title">Avaliação!</h2>
              <div className="camp">
                <Rating
                  sx={{ fontSize: "3rem" }}
                  value={value}
                  onChange={(event, newValue) => setValue(newValue)}
                />
              </div>
              <h3 className="info">Escala: 1 (Muito ruim) a 5 (Excelente)</h3>
              <div className="camp">
                <div className="input textarea">
                  <textarea name="message" id="message" required></textarea>
                  <label htmlFor="message">Nos conte mais sobre isso...</label>
                </div>
              </div>
              <div className="camp">
                <div className="input">
                  <button className="default">Enviar</button>
                </div>
              </div>
            </>
          ) : page === "solicitacao" ? (
            <>
              <h2 className="title">Faça a sua solicitação!</h2>
              <div className="camp">
                <div className="input">
                  <input type="text" name="title" id="title" required />
                  <label htmlFor="title">O que você precisa?</label>
                </div>
              </div>
              <div className="camp">
                <div className="input">
                  <select name="local" id="local" defaultValue="" required>
                    <option value="" disabled>
                      Local
                    </option>
                    <option value="sala">Sala</option>
                    <option value="laboratorio">Laboratório</option>
                    <option value="biblioteca">Biblioteca</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              <div className="camp">
                <div className="input">
                  <input type="text" name="local" id="local" required />
                  <label htmlFor="title">Outro</label>
                </div>
              </div>
              <div className="camp">
                <div className="input textarea">
                  <textarea name="message" id="message" required></textarea>
                  <label htmlFor="message">Descrição detalhada...</label>
                </div>
              </div>
              <div className="camp">
                <div className="input image">
                  <input type="file" name="img" id="img" />
                  <label htmlFor="img">Nos envie uma imagem! <ion-icon name="image"></ion-icon></label>
                </div>
              </div>
              <div className="camp">
                <div className="input">
                  <button className="default">Enviar</button>
                </div>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </form>
      </section>
    </Screen>
  );
}

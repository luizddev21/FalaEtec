import Screen from "../../components/Screen";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import api from '../../js/api.js';

export default function Interaction() {
  const [value, setValue] = useState(3);
  const [searchParams] = useSearchParams();

  const page = searchParams.get("type");

  const [teachers, setTeachers] = useState([]);
  const [evaluationType, setEvaluationType] = useState("");

  useEffect(() => {
    async function loadTeacherData() {
      const response = await api.apiFetch('/teacher/name-of-teachers');

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setTeachers(data);
    }

    loadTeacherData();
  }, [])

  return (
    <Screen>
      <section>
        <form action="" className="type2">
          {page === "avaliacao" ? (
            <>
              <h2 className="title">Nos dê o seu feedback!</h2>

              <div className="camp">
                <div className="input">
                  <select
                    name="title"
                    id="title"
                    value={evaluationType}
                    onChange={(event) => setEvaluationType(event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Sobre quem é a avaliação?
                    </option>
                    <option value="professor">Professor</option>
                    <option value="escola">Escola</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              {evaluationType === "professor" && (
                <div className="camp">
                  <div className="input">
                    <select name="title" id="title-professor" defaultValue="" required>
                      <option value="" disabled>
                        Quem é o professor?
                      </option>
                      {
                        teachers.map((teacher, index) => (
                          <option key={index} value={teacher}>{teacher}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              )}

              {evaluationType === "outro" && (
                <div className="camp">
                  <div className="input">
                    <input type="text" name="title" id="title-outro" required />
                    <label htmlFor="title-outro">Sobre quem seria?</label>
                  </div>
                </div>
              )}

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
                  <textarea name="desc" id="desc" required></textarea>
                  <label htmlFor="desc">Nos conte mais sobre isso...</label>
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
                  <input type="text" name="sub-local" id="sub-local" required />
                  <label htmlFor="title">Nos dê mais detalhes</label>
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

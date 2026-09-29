import Screen from "../../../../components/Screen";
import { useLocation, useSearchParams } from "react-router-dom";
import api from "../../../../js/api.js";
import Rating from "@mui/material/Rating";

import Loading from "../../../../components/Loading";
import Message from "../../../../components/Message.jsx";
import { useState } from "react";

function ReplyModal({ setShowReplyModal }) {
  return (
    <section className="reply-modal">
      <form className="type2">
        <div className="camp">
          <div className="input textarea">
            <textarea
              name="reply"
              id="reply"
              required
            ></textarea>
            <label htmlFor="reply">Digite aqui a sua resposta</label>
          </div>
        </div>

        <div className="camp">
          <div className="input">
            <button
              type="button"
              className="danger"
              onClick={() => setShowReplyModal(false)}
            >
              Cancelar
            </button>
          </div>

          <div className="input">
            <button type="submit" className="default">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}


export default function Info() {
  const { state } = useLocation();
  const [showReplyModal, setShowReplyModal] = useState(false);

  const interacao = state.obj;
  const props = state.props ? state.props : null;
  const userType = props.userType ? props.userType : null;

  return (
    <>
      { showReplyModal && <div className="non-clickable"></div> }
      <Screen>
        { showReplyModal && <ReplyModal setShowReplyModal={setShowReplyModal} /> }
        <section>
          {Object.entries(interacao).map(([key, data]) => {
            return (
              <div key={key} className="camp">
                <div className="output">
                  <p className="label">{key}</p>
                  <p className="value">{data}</p>
                </div>
              </div>
            );
          })}
          {props?.urlImg !== undefined
            ? props?.urlImg !== null && (
                <div key="Imagem" className="camp">
                  <div className="output">
                    <p className="label">Imagem</p>
                    <img
                      src={`${api.API_URL}${props.urlImg}`}
                      alt="Imagem da solicitação"
                    />
                  </div>
                </div>
              )
            : props?.level !== undefined &&
              props?.level !== null && (
                <div key="Nota" className="camp">
                  <div className="output">
                    <p className="label">Nota</p>
                    <Rating
                      sx={{ fontSize: "3rem" }}
                      value={props.level}
                      readOnly
                    />
                  </div>
                </div>
              )}
          {["gestor", "professor"].includes(userType) && <button className="default" onClick={() => setShowReplyModal(true)}>Responder</button>}
        </section>
      </Screen>
    </>
  );
}

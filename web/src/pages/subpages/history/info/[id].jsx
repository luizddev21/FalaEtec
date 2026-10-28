// Detalhe de uma interação selecionada no histórico ou painel: exibe campos,
// anexo/nota opcionais e, para professor/gestor, permite responder ou apagar resposta.
import Screen from "../../../../components/Screen";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../../../../js/api.js";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";

import { textFormatter } from "../../../../js/utils/text.formatter.js";

export default function Info() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});

  // O histórico transfere os dados de exibição pelo state e o ID segue na URL.
  const interacao = state.obj;
  const props = state.props ? state.props : null;

  const [replyForm, setReplyForm] = useState({
    message: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // O perfil determina se a área administrativa de resposta deve ser oferecida.
    async function loadUserData() {
      try {
        setLoading(true);

        const response = await api.apiFetch("/user/profile");
        const data = await response.json();

        setUserData(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  const handleChangeReplyForm = (e) => {
    const { name, value } = e.target;

    setReplyForm({
      ...replyForm,
      [name]: value,
    });

    console.log(form);
  };

  const handleSubmitReplyForm = async (e) => {
    // Cria uma resposta vinculada ao ID da interação e retorna à lista se der certo.
    e.preventDefault();

    try {
      setLoading(true);
      const data = await api.createAnswer(form.message, id);
      if (data.status === "success") navigate(-1);
    } catch (error) {
      console.error("Erro ao tentar enviar resposta: ", error);
      setError("Erro ao tentar enviar resposta.");
    } finally {
      setLoading(false);
    }
  };

  // Altera o status da interação do tipo solicitação vinculada ao ID.
  const handleSubmitStatusForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await api.changeInteractionStatus(e.target.value, id);
      if (data.status === "success") navigate(-1);
    } catch (error) {
      console.error("Erro ao tentar trocar o status da interação: ", error);
      setError("Erroao tentar trocar o status da interação");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    // Remove a resposta atual e volta à tela anterior após confirmação do backend.
    try {
      setLoading(true);

      const data = await api.deleteAnswer(id);

      if (data.status === "success") navigate(-1);
    } catch (error) {
      console.error("Erro ao apagar resposta:", error);
      setError("Erro ao apagar resposta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Screen loading={loading} message={{ type: "error", message: error }}>
        <section>
          {/* Os rótulos vêm do objeto entregue pela tela de histórico/admin. */}
          {Object.entries(interacao).map(([key, data]) => {
            return (
              data !== null &&
                <div key={key} className="camp">
                  <div className="output">
                    <p className="label">{key}</p>
                    <p className="value">
                      {!["Classe", "Resposta", "Descrição"].includes(key)
                        ? textFormatter.capitalize(data)
                        : data}
                    </p>
                  </div>
                </div>
              )
          })}
          {props?.urlImg && (
            <div className="camp">
              <div className="output">
                <p className="label">Imagem</p>
                <img
                  src={`${api.API_URL}${props.urlImg}`}
                  alt="Imagem da solicitação"
                />
              </div>
            </div>
          )}
          {props?.level != null && (
            <div className="camp">
              <div className="output">
                <p className="label">Nota</p>
                <Rating
                  value={Number(props.level)}
                  readOnly
                  sx={{ fontSize: "3rem" }}
                />
              </div>
            </div>
          )}
          {props?.status != null && (
            <form className="type2 no-padding">
              <div className="camp">
                <div className="input">
                  <select name="status" id="status" onChange={handleSubmitStatusForm} defaultValue="">
                    <option value="" disabled>Alterar status</option>

                    <option value="pendente">Pendente</option>
                    <option value="rejeitado">Rejeitado</option>
                    <option value="concluido">Concluído</option>
                  </select>
                </div>
              </div>
            </form>
          )}
          {["gestor", "professor"].includes(userData.type) &&
            (interacao.Resposta ? (
              <div className="camp">
                <div className="input">
                  <button
                    type="button"
                    className="danger"
                    onClick={handleDelete}
                  >
                    Apagar resposta
                  </button>
                </div>
              </div>
            ) : (
              <form className="type2 no-padding" onSubmit={handleSubmitReplyForm}>
                <div className="camp">
                  <div className="input textarea">
                    <textarea
                      value={replyForm.message}
                      onChange={handleChangeReplyForm}
                      name="message"
                      id="message"
                      required
                    />
                    <label htmlFor="message" className="label">
                      Resposta
                    </label>
                  </div>
                </div>

                <div className="camp">
                  <div className="input">
                    <button className="default">Responder</button>
                  </div>
                </div>
              </form>
            ))}
        </section>
      </Screen>
    </>
  );
}

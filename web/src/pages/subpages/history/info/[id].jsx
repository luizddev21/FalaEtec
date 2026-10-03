import Screen from "../../../../components/Screen";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../../../../js/api.js";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";

export default function Info() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});

  const interacao = state.obj;
  const props = state.props ? state.props : null;

  const [form, setForm] = useState({
    message: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    console.log(form);
  };

  const handleSubmit = async (e) => {
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

  const handleDelete = async () => {
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
          {Object.entries(interacao).map(([key, data]) => {
            return (
              data !== null && (
                <div key={key} className="camp">
                  <div className="output">
                    <p className="label">{key}</p>
                    <p className="value">{data}</p>
                  </div>
                </div>
              )
            );
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
              <form className="type2 no-padding" onSubmit={handleSubmit}>
                <div className="camp">
                  <div className="input textarea">
                    <textarea
                      value={form.message}
                      onChange={handleChange}
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

// Formulário de avaliação: carrega docentes para seleção opcional, coleta nota
// e comentário e envia os campos como FormData à API.
import Screen from "../../components/Screen";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { textFormatter } from "../../js/utils/text.formatter.js";

import api from "../../js/api.js";

export default function Avaliacao() {
  const [value, setValue] = useState(3);

  const navigate = useNavigate();

  const [error, setError] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  const page = "avaliacao";

  const [teachers, setTeachers] = useState([]);

  // Teacher DATA GET
  useEffect(() => {
    // Carrega nomes que alimentam a lista quando o alvo da avaliação é professor.
    async function loadTeacherData() {
      const response = await api.apiFetch("/user/teacher-all-names");
      if (!response.ok) throw new Error(response.error);

      setTeachers(await response.json());
    }

    try {
      setLoading(true);
      loadTeacherData();
    } catch {
      setError("Erro ao tentar pegar dados dos professores.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Lógica de envio de formulário

  const [form, setForm] = useState({
    title: "",
    professor: "",
    outro: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // Consolida o alvo escolhido, nota e descrição no formato esperado pelo serviço.
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "title",
      form.outro !== ""
        ? form.outro
        : form.professor !== ""
          ? `${form.title} - ${form.professor}`
          : `${form.title}`,
    );

    formData.append("professor", form.professor);
    formData.append("desc", form.desc);
    formData.append("level", value);
    formData.append("type", page);

    try {
      setLoading(true);
      await api.createInteraction(formData);
      navigate("/confirm");
    } catch (error) {
      console.error("Erro ao tentar enviar interação: ", error);
      setError("Erro ao tentar enviar interação.");
    } finally {
      setLoading(false);
    }
  };

  return(
    <Screen loading={loading} message={{ type: "error", message: error }}>
      <section>
        <form onSubmit={handleSubmit} className="type2">
          <h2 className="title">Nos dê o seu feedback!</h2>

          <div className="camp">
            <div className="input">
              <select
                aria-label="Sobre quem é a avaliação?"
                name="title"
                id="title"
                value={form.title}
                onChange={handleChange}
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

          {form.title === "professor" && (
            <div className="camp">
              <div className="input">
                <select
                  aria-label="Professor avaliado"
                  onChange={handleChange}
                  value={form.professor}
                  name="professor"
                  id="professor"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Quem é o professor?
                  </option>
                  {teachers.map((teacher, index) => (
                    <option key={index} value={teacher}>
                      {textFormatter.capitalize(teacher)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {form.title === "outro" && (
            <div className="camp">
              <div className="input">
                <input
                  onChange={handleChange}
                  value={form.outro}
                  type="text"
                  name="outro"
                  id="outro"
                  required
                />
                <label htmlFor="outro">Sobre quem seria?</label>
              </div>
            </div>
          )}

          <h2 className="title">Avaliação!</h2>

          <div className="camp">
            <Rating
              getLabelText={(rating) => `${rating} de 5 estrelas`}
              sx={{ fontSize: "3rem" }}
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
            />
          </div>

          <h3 className="info">Escala: 1 (Muito ruim) a 5 (Excelente)</h3>

          <div className="camp">
            <div className="input textarea">
              <textarea
                onChange={handleChange}
                value={form.desc}
                name="desc"
                id="desc"
                required
              ></textarea>
              <label htmlFor="desc">Nos conte mais sobre isso...</label>
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
  )
}

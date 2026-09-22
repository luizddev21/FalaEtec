import Screen from "../../components/Screen";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import api from "../../js/api.js";

export default function Avaliacao() {
  const [value, setValue] = useState(3);

  const page = "avaliacao";

  const [teachers, setTeachers] = useState([]);

  // Teacher DATA GET
  useEffect(() => {
    async function loadTeacherData() {
      const response = await api.apiFetch("/teacher/name-of-teachers");

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setTeachers(data);
    }

    loadTeacherData();
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
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "title",
      form.outro !== "" ? form.outro : `${form.title} - ${form.professor}`,
    );

    formData.append("professor", form.professor);
    formData.append("desc", form.desc);
    formData.append("level", value);
    formData.append("type", page);

    return await api.createInteraction(formData);
  };

  return (
    <Screen>
      <section>
        <form onSubmit={handleSubmit} className="type2">
          <h2 className="title">Nos dê o seu feedback!</h2>

          <div className="camp">
            <div className="input">
              <select
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
                      {teacher}
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
  );
}

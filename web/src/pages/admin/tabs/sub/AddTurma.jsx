// Formulário para criar uma turma vinculada a um curso existente; a lista de
// cursos vem da API e os campos são enviados a /turma/create.
import Screen from "../../../../components/Screen";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../../../js/api";

export default function AddTurma() {
  const [loading, setLoading] = useState(false);
  const [cursoData, setCursoData] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Carrega as opções de curso usadas no vínculo da nova turma.
  useEffect(() => {
    async function loadCursoData() {
      try {
        setLoading(true);

        const data = await api.getAllCurso();

        setCursoData(data);

        console.log(cursoData[0])

        setForm({
          ...form,
          course: data[0].curso_id,
        });
      } catch (error) {
        console.error("Erro ao buscar cursos: ", error);
        setError("Erro ao buscar cursos");
      } finally {
        setLoading(false);
      }
    }

    loadCursoData();
  }, []);

  const [form, setForm] = useState({
    classroom: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // Envia o nome da turma e o curso selecionado, depois volta ao painel.
    e.preventDefault();

    console.log(form);

    try {
      setLoading(true);
      await api.createTurma(form);
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao tentar criar a turma: ", error);
      setError("Erro ao tentar criar a turma.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen loading={loading} message={{ type: "error", message: error }}>
      <section>
        <form className="type2" onSubmit={handleSubmit}>
          <div className="camp">
            <div className="input">
              <input
                type="text"
                name="classroom"
                id="classroom"
                value={form.classroom}
                onChange={handleChange}
                required
              />
              <label htmlFor="classroom">Nome da sala</label>
            </div>
          </div>
          <div className="camp">
            <div className="input">
              <select
                aria-label="Curso da turma"
                name="course"
                id="course"
                onChange={handleChange}
                value={form.course}
              >
                {cursoData.map((curso) => {
                  return (
                    <option key={curso.curso_id} value={curso.curso_id}>
                      {curso.nome}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="camp">
            <div className="input">
              <button className="default">Criar</button>
            </div>
          </div>
        </form>
      </section>
    </Screen>
  );
}

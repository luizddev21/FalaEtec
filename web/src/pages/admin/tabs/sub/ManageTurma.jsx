// Edição de turma recebida por location.state. Recupera cursos para permitir
// alterar o vínculo e envia nome/chaves ao endpoint /turma/update.
import Screen from "../../../../components/Screen";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../../../js/api";

export default function ManageTurma() {
  const [loading, setLoading] = useState(false);
  const { state: turma } = useLocation();
  const [cursoData, setCursoData] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Prepara opções de curso para a relação curso_turma.
  useEffect(() => {
    async function loadCursoData() {
      try {
        setLoading(true);

        const data = await api.getAllCurso();

        setCursoData(data);

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
    id: turma.id,
    name: turma.classroom,
    course: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // Persiste alterações e volta ao painel administrativo.
    e.preventDefault();

    console.log(form)

    try {
      setLoading(true);
      await api.updateTurma(form);
      navigate("/admin");
    } catch (error) {
      console.error(
        "Erro ao tentar alterar as informações da turma: ",
        error,
      );
      setError("Erro ao tentar tentar alterar as informações da turma.");
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
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                maxLength={5}
                required
              />
              <label htmlFor="name">Nome da turma</label>
            </div>
          </div>
          <div className="camp">
              <div className="input">
                <select
                  aria-label="Curso da turma"
                  value={form.course}
                  name="course"
                  id="course"
                  onChange={handleChange}
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
              <button className="default">Atualizar</button>
            </div>
          </div>
        </form>
      </section>
    </Screen>
  );
}

import Screen from "../../../../components/Screen";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../../../js/api";

export default function ManageCurso() {
  const [loading, setLoading] = useState(false);
  const { state: curso } = useLocation();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: curso.id,
    name: curso.name,
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

    console.log(form)

    try {
      setLoading(true);
      await api.updateCurso(form);
      navigate("/admin");
    } catch (error) {
      console.error(
        "Erro ao tentar alterar as informações do curso: ",
        error,
      );
      setError("Erro ao tentar tentar alterar as informações do curso.");
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
                required
              />
              <label htmlFor="name">Nome do curso</label>
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

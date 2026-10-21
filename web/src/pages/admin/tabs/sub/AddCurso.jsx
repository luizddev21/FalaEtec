// Formulário simples para incluir curso e retornar ao painel após a gravação.
import Screen from "../../../../components/Screen";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../../../../js/api";

export default function AddCurso() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // Envia o nome informado ao serviço de cursos.
    e.preventDefault();
    try {
      setLoading(true);
      await api.createCurso(form);
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao tentar criar o curso: ", error);
      setError("Erro ao tentar criar o curso.");
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
              <button className="default">Criar</button>
            </div>
          </div>
        </form>
      </section>
    </Screen>
  );
}

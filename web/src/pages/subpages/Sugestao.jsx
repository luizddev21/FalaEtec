import Screen from "../../components/Screen";
import { useState } from "react";
import Message from "../../components/Message.jsx";
import { useNavigate } from "react-router-dom";

import api from "../../js/api.js";

export default function Sugestao() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  const page = "sugestao";

  const [form, setForm] = useState({
    title: "",
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

    formData.append("title", form.title);
    formData.append("desc", form.desc);
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

  return (
    <Screen loading={loading}>
      {error !== "" && <Message type="error" message={error} />}
      <section>
        <form onSubmit={handleSubmit} className="type2">
          <h2 className="title">Faça a sua sugestão!</h2>
          <div className="camp">
            <div className="input">
              <input
                value={form.title}
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                required
              />
              <label htmlFor="title">Qual a sua ideia?</label>
            </div>
          </div>
          <div className="camp">
            <div className="input textarea">
              <textarea
                value={form.desc}
                onChange={handleChange}
                name="desc"
                id="desc"
                required
              ></textarea>
              <label htmlFor="desc">Descreva sua ideia!</label>
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

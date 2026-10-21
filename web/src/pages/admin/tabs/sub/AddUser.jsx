// Formulário administrativo para criar aluno, professor ou gestor. A turma é
// carregada para a escolha do aluno; os dados seguem para a rota /user/create.
import Screen from "../../../../components/Screen";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../../../js/api";

export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const [turmaData, setTurmaData] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Busca turmas ao abrir a tela para preencher a associação de novos alunos.
  useEffect(() => {
    async function loadTurmaData() {
      try {
        setLoading(true);

        const data = await api.getAllTurma();

        setTurmaData(data);

        setForm({
          ...form,
          classroom: data[0].turma_id,
        });
      } catch (error) {
        console.error("Erro ao buscar turmas: ", error);
        setError("Erro ao buscar turmas");
      } finally {
        setLoading(false);
      }
    }

    loadTurmaData();
  }, []);

  const [form, setForm] = useState({
    rm: "",
    name: "",
    classroom: "",
    type: "aluno",
    password: "",
  });

  const handleChange = (e) => {
    // Atualiza o campo correspondente sem perder os demais valores digitados.
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // Envia o objeto de cadastro e retorna ao painel quando a API conclui a ação.
    e.preventDefault();

    console.log(form);

    try {
      setLoading(true);
      await api.createUser(form);
      navigate("/admin");
    } catch (error) {
      console.error("Erro ao tentar criar o usuário: ", error);
      setError("Erro ao tentar criar o usuário.");
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
                name="rm"
                id="rm"
                value={form.rm}
                onChange={handleChange}
                maxLength={5}
                required
              />
              <label htmlFor="rm">RM (Até 5 caracteres numéricos)</label>
            </div>

            <div className="input">
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name">Nome</label>
            </div>
          </div>
          <div className="camp">
            <div className="input">
              <select
                aria-label="Tipo de usuário"
                name="type"
                id="type"
                onChange={handleChange}
                value={form.type}
              >
                <option value="aluno">Aluno</option>
                <option value="professor">Professor</option>
                <option value="gestor">Gestor</option>
              </select>
            </div>
            {form.type === "aluno" && (
              <div className="input">
                <select
                  aria-label="Turma do aluno"
                  name="classroom"
                  id="classroom"
                  onChange={handleChange}
                  value={form.classroom}
                >
                  {turmaData.map((turma) => {
                    return (
                      <option key={turma.turma_id} value={turma.turma_id}>
                        {turma.classe}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          <div className="camp">
            <div className="input">
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                required
                onChange={handleChange}
              />
              <label htmlFor="password">Senha</label>
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

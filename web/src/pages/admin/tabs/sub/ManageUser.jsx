// Edição de uma conta selecionada na lista. Carrega turmas para alunos e envia
// identificador, nome, associação e possível nova senha para /user/update.
import Screen from "../../../../components/Screen";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../../../js/api";

export default function ManageUser() {
  const [loading, setLoading] = useState(false);
  const { state: user } = useLocation();
  const [turmaData, setTurmaData] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Busca opções de turma antes de preencher o seletor do aluno.
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
    oldRm: user.rm,
    rm: user.rm,
    name: user.nome,
    classroom: "",
    type: user.type,
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // Envia formulário e retorna ao painel quando o serviço confirma atualização.
    e.preventDefault();

    try {
      setLoading(true);
      await api.updateUser(form);
      navigate("/admin");
    } catch (error) {
      console.error(
        "Erro ao tentar alterar as informações do usuário: ",
        error,
      );
      setError("Erro ao tentar tentar alterar as informações do usuário.");
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
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={form.newPassword}
                onChange={handleChange}
              />
              <label htmlFor="newPassword">Nova senha</label>
            </div>
            {user.type === "aluno" && (
              <div className="input">
                <select
                  aria-label="Turma do aluno"
                  value={form.classroom}
                  name="classroom"
                  id="classroom"
                  onChange={handleChange}
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
              <button className="default">Atualizar</button>
            </div>
          </div>
        </form>
      </section>
    </Screen>
  );
}

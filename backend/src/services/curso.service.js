// Regras para listar cursos ativos, desabilitar um curso e alterar seus dados.
import db from "../config/db.js";

export const imp = {
  async getAll(user) {
    // Retorna cursos que não estejam marcados como desabilitados.
    // O schema creation.sql não declara `disabled`; esta consulta pressupõe que
    // a coluna já exista na base utilizada pela aplicação.
    if (!user.sub) throw new Error("Tipo de usuário inválido");

    let sql = `
        SELECT *
        FROM curso
        WHERE disabled != 1;
    `;

    const allCurso = await db.query(sql);

    return allCurso;
  },

  async delete({ curso_id }) {
    // A remoção é lógica: marca `disabled` em vez de apagar a linha; essa coluna
    // também não está definida no schema creation.sql inicial.

    const sql = `
      UPDATE curso
      SET disabled = 1
      WHERE curso_id = ?;
    `

    const result = await db.query(sql, curso_id);

    console.log(result)

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: "Curso apagado"
      };
    }
  },

  async create({ name }) {
    // Cria um identificador UUID para o curso antes de inserir nome e chave.
    const sql = `
      INSERT INTO curso (curso_id, nome)
      VALUES (?, ?);
    `

    const id = crypto.randomUUID();

    const result = await db.query(sql, [id, name]);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: "Curso criado"
      };
    }
  },

  async update({ id, name }) {
    // Altera o nome do curso identificado pelo painel administrativo.
    const sql = `
      UPDATE curso
      SET nome = ?
      WHERE curso_id = ?
    `

    const result = await db.query(sql, [name, id]);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: "Curso atualizado"
      };
    }
  }
};

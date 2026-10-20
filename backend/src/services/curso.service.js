import db from "../config/db.js";

export const imp = {
  async getAll(user) {
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

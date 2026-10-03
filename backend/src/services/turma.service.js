import db from "../config/db.js";

export const imp = {
  async getAll(user) {
    if (!user.sub) throw new Error("Tipo de usuário inválido");

    let sql = `
    SELECT *
    FROM turma
  `;

    const allTurma = await db.query(sql);

    return allTurma;
  },
};

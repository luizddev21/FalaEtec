import db from "../config/db.js";
import crypto from "crypto";

export const imp = {
  async create(user, { message, interactionId }) {
    if (!user.sub) throw new Error("Tipo de usuário inválido");

    const sql = `
      INSERT INTO resposta
      (resposta_id, mensagem, tipo_autor, interacao_id, ${user.type}_id)
      VALUES
      (?, ?, ?, ?, ?);
    `;

    const id = crypto.randomUUID();

    const result = await db.query(sql, [
      id,
      message,
      user.type,
      interactionId,
      user.sub
    ]);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: "Reposta criada",
      };
    }

    throw new Error("Não foi possível criar sua reposta");
  },

  async delete({ answerId }) {
    const result = await db.query(`
      DELETE FROM resposta
      WHERE interacao_id = ?
    `, answerId);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: "Resposta apagada",
      };
    }

    throw new Error("Não foi possível apagar sua resposta");
  }
};

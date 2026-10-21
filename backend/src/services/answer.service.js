// Persiste a resposta de professor/gestor a uma interação e oferece sua remoção.
import db from "../config/db.js";
import crypto from "crypto";
import textFormatter from "../utils/text.formatter.js";

export const imp = {
  async create(user, { message, interactionId }) {
    // O tipo do autor escolhe a coluna de chave estrangeira que identifica quem respondeu.
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
      textFormatter.normalize(message, false),
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
    // A consulta atual compara answerId com interacao_id e remove a resposta
    // associada à interação recebida.
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

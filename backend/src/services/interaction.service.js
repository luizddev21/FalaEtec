import db from "../config/db.js";
import crypto from "crypto";

export const imp = {
  async create(user, formData, file) {
    console.log("Chegou aqui");
    console.log(formData);
    console.log(user.sub);
    console.log(formData.type);
    console.log(formData.title);
    console.log(formData.sublocal)

    // TODO:
    // 1. Decidir qual o tipo de interação (avaliação, solicitação, relato ou sugestão)
    // 2. Com base nisso definir um sql para cada tipo
    // 3. Formatar dados antes de subir
    // 4. Tentar subir
    // 5. Retornar sucesso ou falha

    // Tipos:
    // avaliação: tipo, titulo, descricao, data, nota
    // solicitacao: tipo, titulo, local, sublocal, descricao, url_img
    // sugestao: tipo, titulo, descricao
    // relato: tipo, titulo, descricao, local, data, acompanhamento (0, 1), anonimo (0, 1)

    // Definindo o tipo da interação

    if (!["avaliacao", "solicitacao", "sugestao", "relato"].includes(formData.type))
      throw new Error("Tipo da interação inválido");

    const sql =
      formData.type === "avaliacao"
        ? `
                INSERT INTO interacao
                (interacao_id, aluno_id, professor_id, tipo, titulo, descricao, nota)
                VALUES
                (?, ?, ?, ?, ?, ?, ?);
            `
        : formData.type === "solicitacao"
          ? `
                INSERT INTO interacao
                (interacao_id, aluno_id, tipo, titulo, descricao, local, sub_local, url_img)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?);
            `
          : formData.type === "sugestao"
            ? `
                INSERT INTO interacao
                (interacao_id, aluno_id, tipo, titulo, descricao)
                VALUES
                (?, ?, ?, ?, ?);
            `
            : `
                INSERT INTO interacao
                (interacao_id, aluno_id, tipo, titulo, descricao, aconteceu, acompanhamento, anonimo)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?);
            `;

    // Pega o id do professor no banco de dados

    let professorQuery;
    let professorId;

    if (formData.type === "avaliacao") {
      professorQuery = await db.query(
        `
            SELECT professor_id
            FROM professor
            WHERE nome = ?    
        `,
        formData.professor,
      );

      professorId = professorQuery[0].professor_id;
    };

    // No caso de ser uma solicitação
    // Recebe e guarda uma imagem

    let url_img = "";

    if (file) {
      url_img = `/uploads/${file.filename}`;
    }

    const id = crypto.randomUUID();

    // Enviando uma interação

    const result =
      formData.type === "avaliacao"
        ? await db.query(sql, [
          id,
          user.sub,
          professorId,
          formData.type,
          formData.title,
          formData.desc,
          formData.level,
        ])
        : formData.type === "solicitacao"
          ? await db.query(sql, [
            id,
            user.sub,
            formData.type,
            formData.title,
            formData.desc,
            formData.local,
            formData.sublocal,
            url_img,
          ])
          : formData.type === "sugestao"
            ? await db.query(sql, [id, user.sub, formData.type, formData.title, formData.desc])
            : await db.query(sql, [
              id,
              user.sub,
              formData.type,
              formData.title,
              formData.desc,
              formData.date,
              formData.attendance,
              formData.anonymous,
            ]);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: `${formData.type} enviado com sucesso!`,
      };
    }

    throw new Error(`Não foi possível enviar ${formData.type}`);
  },

  async getAll(user, { type }) {
    console.log(type);
    if (!["avaliacao", "sugestao", "relato", "solicitacao"].includes(type))
      throw new Error("Tipo da interação inválido");

    if (!user.sub)
      throw new Error("Tipo de usuário inválido");

    const userId = user.sub;
    
    const sql = `
        SELECT interacao_id, tipo, titulo, descricao, aconteceu, acompanhamento, anonimo
        FROM interacao
        WHERE aluno_id = ? AND tipo = ?
      `

    const allInteraction = await db.query(sql, [userId, type]);

    return allInteraction;
  }
};

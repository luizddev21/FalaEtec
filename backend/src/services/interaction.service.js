// Regras de criação e consulta das quatro categorias de interação que os
// alunos enviam. Este módulo traduz os campos do formulário para a tabela interacao.
import db from "../config/db.js";
import crypto from "crypto";

import { textFormatter } from "../utils/text.formatter.js";

export const imp = {
  async create(user, formData, file) {
    // Os formulários compartilham a tabela interacao, mas cada categoria
    // grava um conjunto próprio de campos; a data geral usa o padrão do banco.
    // Avaliação: título, descrição, nota e professor opcional; solicitação:
    // título, descrição, local, sublocal e imagem; sugestão: título e descrição;
    // relato: título, descrição, acontecimento, acompanhamento e anonimato.

    // Uma interação sempre fica associada à conta autenticada; apenas aluno
    // pode criar registros, e o tipo determina quais colunas serão preenchidas.
    if (user.type !== "aluno")
      throw new Error("Somente alunos podem enviar interações!");

    if (
      !["avaliacao", "solicitacao", "sugestao", "relato"].includes(
        formData.type,
      )
    )
      throw new Error("Tipo da interação inválido");

    // Cada categoria envia campos diferentes, por isso a consulta INSERT varia;
    // os valores continuam parametrizados para não concatenar conteúdo do formulário.
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

    // Avaliações dirigidas a um professor guardam também a chave do professor;
    // as avaliações sobre escola ou outro tema deixam essa relação vazia.
    let professorQuery;
    let professorId;

    if (formData.type === "avaliacao" && formData.professor !== "") {
      professorQuery = await db.query(
        `
            SELECT professor_id
            FROM professor
            WHERE nome = ?    
        `,
        formData.professor,
      );

      professorId = professorQuery[0].professor_id;
    }

    // O Multer grava o arquivo; aqui o serviço guarda somente a URL relativa no banco.
    let url_img = "";

    if (file) {
      url_img = `/uploads/${file.filename}`;
    }

    const id = crypto.randomUUID();

    // A consulta e seus parâmetros seguem o formato específico do tipo escolhido.
    const result =
      formData.type === "avaliacao"
        ? await db.query(sql, [
          id,
          user.sub,
          professorId !== undefined ? professorId : null,
          formData.type,
          textFormatter.normalize(formData.title, true),
          textFormatter.normalize(formData.desc, false),
          formData.level,
        ])
        : formData.type === "solicitacao"
          ? await db.query(sql, [
            id,
            user.sub,
            formData.type,
            textFormatter.normalize(formData.title, true),
            textFormatter.normalize(formData.desc, false),
            formData.local,
            textFormatter.normalize(formData.sublocal, false),
            url_img !== "" ? url_img : null,
          ])
          : formData.type === "sugestao"
            ? await db.query(sql, [
              id,
              user.sub,
              formData.type,
              textFormatter.normalize(formData.title, true),
              textFormatter.normalize(formData.desc, false)
            ])
            : await db.query(sql, [
              id,
              user.sub,
              formData.type,
              textFormatter.normalize(formData.title, true),
              textFormatter.normalize(formData.desc, false),
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

  async getAll(user, { type, limit }, { classe, search, status }) {
    // A tela de histórico/admin informa categoria e filtros; o usuário comum
    // recebe apenas seus próprios registros, enquanto o gestor pode consultar a escola.
    if (!["avaliacao", "sugestao", "relato", "solicitacao"].includes(type))
      throw new Error("Tipo da interação inválido");

    if (!user.sub) throw new Error("Tipo de usuário inválido");

    // Os filtros são acumulados como condições parametrizadas. O limite é
    // acrescentado somente quando positivo; resultados vêm do mais recente.
    const where = [`i.tipo = ?`];

    const params = [type];

    if (user.type !== "gestor") {
      where.push(`i.${user.type}_id = ?`);
      params.push(user.sub);
    }

    // Filtro por turma (classe)
    if (classe) {
      where.push("t.classe = ?");
      params.push(classe);
    }

    // Filtro por pesquisa
    if (search) {
      where.push("(i.descricao LIKE ? OR a.nome LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (status) {
      where.push("i.status = ?");
      params.push(status);
    }

    let sql = `
      SELECT
      i.interacao_id,
      i.tipo,
      i.titulo,
      i.descricao,
      i.data,
      i.status,
      i.nota,
      i.local,
      i.sub_local,
      i.url_img,
      i.aconteceu,
      i.acompanhamento,
      i.anonimo,
      IF(i.anonimo = 1, "Anônimo", a.nome) AS aluno_nome,
      CONCAT(t.classe, ' - ', c.nome) AS classe,
      r.mensagem AS resposta
      FROM interacao i
      LEFT JOIN aluno a
      ON i.aluno_id = a.aluno_id
      LEFT JOIN turma t
      ON a.turma_id = t.turma_id
      LEFT JOIN resposta r
      ON i.interacao_id = r.interacao_id
      LEFT JOIN curso_turma ct
      ON t.turma_id = ct.turma_id
      LEFT JOIN curso c
      ON ct.curso_id = c.curso_id
      WHERE ${where.join(" AND ")}
      ORDER BY i.data DESC
    `;

    if (limit > 0) {
      sql += " LIMIT ?";
      params.push(Number(limit));
    }

    const allInteraction = await db.query(sql, params);

    return allInteraction;
  },

  async changeStatus({ status, id }) {
    const sql = `
      UPDATE interacao
      SET status = ?
      WHERE interacao_id = ?
    `;

    const result = db.query(sql, [status, id]);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: `Status da interação alterado com sucesso!`,
      };
    }

    throw new Error(`Não foi possível alterar o status da interação`);
  }
};

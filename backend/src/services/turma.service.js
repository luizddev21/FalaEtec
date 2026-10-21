// Regras de leitura e manutenção de turmas, incluindo sua associação com curso.
import db from "../config/db.js";
import crypto from "crypto";

export const imp = {
  async getAll(user) {
    // Lista turmas vinculadas a cursos para preencher filtros e formulários administrativos.
    if (!user.sub) throw new Error("Tipo de usuário inválido");

    let sql = `
        SELECT t.*, c.nome as curso
        FROM turma t
        JOIN curso_turma ct
          ON t.turma_id = ct.turma_id
        JOIN curso c
          ON ct.curso_id = c.curso_id
    `;

    const allTurma = await db.query(sql);

    return allTurma;
  },

  async delete({ turma_id }) {
    // Remove a turma indicada; as chaves estrangeiras do banco determinam
    // se a exclusão é aceita diante de alunos associados.
    const sql = `
        DELETE
        FROM turma
        WHERE turma_id = ?
    `;

    const result = await db.query(sql, turma_id);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: "Turma apagada",
      };
    }

    throw new Error("Não foi possível apagar a turma");
  },

  async create({ classroom, course }) {
    // Cria primeiro a turma e depois o vínculo curso_turma; se o segundo passo
    // falhar, tenta remover a turma recém-criada para não deixá-la sem vínculo.
    const turma_id = crypto.randomUUID();

    let sql = `
    INSERT INTO turma (turma_id, classe)
    VALUES (?, ?)
  `;

    let result = await db.query(sql, [turma_id, classroom]);

    if (result.affectedRows === 0) {
      throw new Error("Não foi possível criar a turma");
    }

    sql = `
    INSERT INTO curso_turma (turma_id, curso_id)
    VALUES (?, ?)
  `;

    result = await db.query(sql, [turma_id, course]);

    if (result.affectedRows === 0) {
      await this.delete({ turma_id });
      throw new Error(
        "Não foi possível criar o relacionamento entre curso e turma",
      );
    }

    return {
      status: "success",
      msg: "Turma criada com sucesso",
    };
  },

  async update({ id, name, course }) {
    // Atualiza o nome da turma e, em seguida, o curso relacionado.
    let sql = `
    UPDATE turma
    SET classe = ?
    WHERE turma_id = ?
  `;

    let result = await db.query(sql, [name, id]);

    if (result.affectedRows === 0) {
      throw new Error("Erro ao tentar editar a turma");
    }

    sql = `
    UPDATE curso_turma
    SET curso_id = ?
    WHERE turma_id = ?
  `;

    result = await db.query(sql, [course, id]);

    if (result.affectedRows > 0) {
      return {
        status: "success",
        msg: "Usuário atualizado!",
      };
    }

    if (result.affectedRows === 0) {
      throw new Error(
        "Não foi possível editar o relacionamento entre curso e turma",
      );
    }

    return {
      status: "success",
      msg: "Turma criada com sucesso",
    };
  },
};

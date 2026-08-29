import tokenUtil from "../utils/token.util.js";
import db from "../config/db.js";

export async function getProfile({ sub: rm, type }) {
    let classroom = "";

    const sql =
        type === "aluno"
            ? `
                SELECT aluno.nome, turma.classe
                FROM aluno
                JOIN turma
                    ON aluno.turma_id = turma.turma_id
                WHERE aluno.aluno_id = ?;
            `
            : `
                SELECT nome
                FROM ${type}
                WHERE ${type}_id = ?;
            `;


    // IMPORTANTE: await
    let user = await db.query(sql, [rm]);

    user = user[0];


    // Usuário não encontrado
    if (!user) {
        throw new Error("Usuário não encontrado");
    }


    if (user.classe !== undefined) {
        classroom = user.classe;
    }


    const name = user.nome;


    return {
        user: {
            rm,
            name,
            type,
            classroom
        }
    };
}

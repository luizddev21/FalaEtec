import db from '../config/db.js';
import crypto from 'crypto';

export const imp = {
    async createInteraction(user, { professor, title, desc, level, type }, file) {

        console.log("Chegou aqui");
        console.log(user.sub);

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

        if (!['avaliacao', 'solicitacao', 'sugestao', 'relato'].includes(type))
            throw new Error('Tipo da interação inválido');

        const sql = type === 'avaliacao'
            ? `
                INSERT INTO interacao
                (interacao_id, aluno_id, professor_id, tipo, titulo, descricao, nota)
                VALUES
                (?, ?, ?, ?, ?, ?, ?);
            `
            : type === 'solicitacao'
                ? `
                INSERT INTO interacao
                (interacao_id, aluno_id, tipo, titulo, descricao, local, sublocal, url_img)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?);
            `
                : type === 'sugestao'
                    ? `
                INSERT INTO interacao
                (interacao_id, aluno_id, tipo, titulo, descricao)
                VALUES
                (?, ?, ?, ?, ?);
            `
                    : `
                INSERT INTO interacao
                (interacao_id, aluno_id, tipo, titulo, descricao, local, data, acompanhamento, anonimo)
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `

        // Pega o id do professor no banco de dados

        const professorQuery = await db.query(`
            SELECT professor_id
            FROM professor
            WHERE nome = ?    
        `, professor);

        const professorId = professorQuery[0].professor_id;

        // No caso de ser uma solicitação
        // Recebe e guarda uma imagem

        let url_img = ''

        if (file) {
            url_img = `/uploads/${file.filename}`;
        }

        const id = crypto.randomUUID();

        // Enviando uma interação

        const result = type === 'avaliacao'
            ? await db.query(sql, [
                id,
                user.sub,
                professorId,
                type,
                title,
                desc,
                level
            ])
            : type === 'solicitacao'
                ? await db.query(sql, [
                    id,
                    type,
                    title,
                    desc,
                    local,
                    sublocal,
                    url_img
                ])
                : type === 'sugestao'
                    ? await db.query(sql, [
                        id,
                        type,
                        title,
                        desc
                    ])
                    : await db.query(sql, [
                        id,
                        type,
                        title,
                        desc,
                        date,
                        attendance,
                        anonymous
                    ])

        if (result.affectedRows > 0) {
            return {
                status: 'success',
                msg: `${type} enviado com sucesso!`
            };
        }

        throw new Error(`Não foi possível enviar ${type}`);
    }
}
import db from "../config/db.js";
import bcrypt from "bcrypt";

export const imp = {
    async getUser({ sub: rm, type }) {
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
    },

    async getAllUser({ sub: rm, type }) {
        if (!type === "gestor") return;

        const alunoSql = `
        SELECT aluno.aluno_id, aluno.nome, turma.classe
        FROM aluno
        JOIN turma
            ON aluno.turma_id = turma.turma_id
    `;

        const gestorSql = `
        SELECT gestor_id, nome
        FROM gestor
    `;

        const professorSql = `
        SELECT professor_id, nome
        FROM professor
    `;

        const alunos = await db.query(alunoSql);
        const gestor = await db.query(gestorSql);
        const professores = await db.query(professorSql);

        const users = [...alunos, ...gestor, ...professores];

        return users;
    },

    // Função responsável pelo cadastro de novos usuários no sistema.
    // Recebe os dados do usuário enviados pela camada de controle.
    async createUser({ rm, password, name, turma_id, type }) {

        // Verifica se o tipo de usuário informado é válido.
        // O sistema permite o cadastro de alunos, professores e gestores.
        if (!['aluno', 'professor', 'gestor'].includes(type)) {
            throw new Error('Tipo de usuário inválido');
        }

        // Consulta o banco de dados para verificar se já existe
        // um usuário com o identificador informado.
        // O tipo de usuário define qual tabela será consultada.
        const users = await db.query(
            `SELECT * FROM ${type} WHERE ${type}_id = ?`,
            [rm]
        );

        // Verifica se a consulta retornou algum usuário.
        // Caso o número de registros seja maior que zero,
        // significa que o usuário já está cadastrado.
        const userExists = users.length > 0;

        // Impede a realização do cadastro caso já exista
        // um usuário com o mesmo identificador.
        if (userExists) {
            return {
                status: 'failed',
                msg: 'O usuário já existe!'
            };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Define a instrução SQL de acordo com o tipo de usuário.
        // Alunos possuem um campo adicional referente à turma,
        // enquanto professores e gestores possuem apenas os dados básicos.
        const sql =
            type === 'aluno'
                ? `INSERT INTO aluno
               (aluno_id, senha, nome, turma_id)
               VALUES (?, ?, ?, ?)`
                : `INSERT INTO ${type}
               (${type}_id, senha, nome)
               VALUES (?, ?, ?)`;

        // Define os parâmetros que serão utilizados na instrução SQL.
        // Para alunos, também é informado o identificador da turma.
        const params =
            type === 'aluno'
                ? [rm, hashedPassword, name, turma_id]
                : [rm, hashedPassword, name];

        // Executa a instrução de inserção e cadastra o novo usuário
        // no banco de dados.
        await db.query(sql, params);

        // Realiza uma nova consulta ao banco de dados para confirmar
        // que o usuário foi cadastrado corretamente e obter seu identificador.
        const newUser = await db.query(
            `SELECT ${type}_id
         FROM ${type}
         WHERE ${type}_id = ?`,
            [rm]
        );

        // Verifica se o usuário foi localizado após a inserção.
        // Caso tenha sido encontrado, retorna uma mensagem de sucesso
        // juntamente com os dados obtidos na consulta.
        if (newUser.length > 0) {
            return {
                status: 'success',
                msg: newUser
            };
        }

        // Caso o usuário não seja localizado após a tentativa de cadastro,
        // retorna uma mensagem informando que ocorreu um erro inesperado.
        return {
            status: 'failed',
            msg: 'Ocorreu um erro inesperado.'
        };
    },

    async changeUserPassword({ rm, newPassword, type }) {
        if (!['aluno', 'professor', 'gestor'].includes(type)) {
            throw new Error('Tipo de usuário inválido');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        const sql = `
        UPDATE ${type}
        SET senha = ?
        WHERE ${type}_id = ?
    `;

        const result = await db.query(sql, [hashedNewPassword, rm]);

        if (result.affectedRows > 0) {
            return {
                status: 'success',
                msg: 'Senha alterada'
            };
        }

        throw new Error('Não foi possível alterar a senha');
    },

    async deleteUser({ rm, type }) {
        const sql = `
        DELETE
        FROM ${type}
        WHERE ${type}_id = ?
    `;

        const result = await db.query(sql, rm)

        if (result.affectedRows > 0) {
            return {
                status: 'success',
                msg: 'Usuário apagado'
            };
        }

        throw new Error('Não foi possível apagar o usuário');
    }
}


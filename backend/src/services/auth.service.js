import db from '../config/db.js';
import bcrypt from 'bcrypt';

import tokenUtil from '../utils/token.util.js';

// Função responsável pelo cadastro de novos usuários no sistema.
// Recebe os dados do usuário enviados pela camada de controle.
export async function registerUser({ rm, password, name, turma_id, type }) {

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
}

export async function loginUser({ rm, password, type }) {

    if (!['aluno', 'professor', 'gestor'].includes(type)) {
        throw new Error('Tipo de usuário inválido');
    }

    let user = await db.query(
        `SELECT * FROM ${type} WHERE ${type}_id = ?`,
    [rm]);

    if (user.length <= 0) throw new Error('RM e/ou senha incorretos');

    user = user[0]

    const isPassword = await bcrypt.compare(
        password,
        user.senha
    );

    if (!isPassword) throw new Error('RM e/ou senha incorretos');

    const userId = type === "aluno" ? user.aluno_id : type === "professor" ? user.professor_id : user.gestor_id

    const payload = {
        sub: userId,
        type: type
    };

    const accessToken = tokenUtil.generateAccessToken(payload);

    const refreshToken = tokenUtil.generateRefreshToken(payload);

    await tokenUtil.saveRefreshToken({
        token: refreshToken,
        tipoUsuario: type,
        usuarioId: userId,
        expiracao: new Date(Date.now() + 7 * 86400000)
    });

    return {
        accessToken,
        refreshToken,
        user: {
            id: userId,
            name: user.nome,
            type
        }
    };

}

export async function refreshUser(refreshToken) {

    if (!refreshToken) {
        throw new Error("Refresh token não fornecido");
    }

    let payload;

    try {
        payload = tokenUtil.verifyRefreshToken(refreshToken);
    } catch {
        throw new Error("Refresh token inválido ou expirado");
    }

    const storedToken =
        await tokenUtil.findRefreshToken(refreshToken);

    if (!storedToken) {
        throw new Error("Refresh token inválido");
    }

    if (storedToken.revogado) {
        throw new Error("Refresh token revogado");
    }

    if (new Date(storedToken.expiracao) <= new Date()) {
        throw new Error("Refresh token expirado");
    }

    await tokenUtil.revokeRefreshToken(refreshToken);

    const newPayload = {
        sub: payload.sub,
        type: payload.type
    };

    const newAccessToken =
        tokenUtil.generateAccessToken(newPayload);

    const newRefreshToken =
        tokenUtil.generateRefreshToken(newPayload);

    await tokenUtil.saveRefreshToken({
        token: newRefreshToken,
        usuarioId: payload.sub,
        tipoUsuario: payload.type,
        expiracao: new Date(Date.now() + 7 * 86400000)
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
}

export async function logoutUser(refreshToken) {

    if (!refreshToken) {
        return;
    }

    await tokenUtil.revokeRefreshToken(refreshToken);
}
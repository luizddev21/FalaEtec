import db from '../config/db.js';
import bcrypt from 'bcrypt';

import tokenUtil from '../utils/token.util.js';

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
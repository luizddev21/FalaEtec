// Centraliza criação, validação e persistência de tokens usados no ciclo de
// sessão: token de acesso curto e refresh token renovável, salvo somente como hash.
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import crypto from 'crypto';

function generateAccessToken(payload) {
    // O payload identifica o usuário (sub) e o tipo de conta; o segredo vem do ambiente.
    return (
        jwt.sign(
            payload, 
            process.env.ACCESS_SECRET, 
            {
                expiresIn: "15m",
            }
        )
    );
}

function generateRefreshToken(payload) {
    // O token de renovação dura mais e permite emitir um novo par de tokens.
    return (
        jwt.sign(
            payload, 
            process.env.REFRESH_SECRET, 
            {
                expiresIn: "7d",
            }
        )
    );
}

function verifyAccessToken(token) {
    // Lança erro quando a assinatura não confere ou o token venceu.
    return (
        jwt.verify(
            token,
            process.env.ACCESS_SECRET
        )
    );
}

function verifyRefreshToken(token) {
    // Confere o token de renovação com segredo separado do token de acesso.
    return (
        jwt.verify(
            token,
            process.env.REFRESH_SECRET
        )
    );
}

function hashRefreshToken(token) {
    // O banco armazena SHA-256, não o valor reutilizável do cookie.
    return (
        crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')
    );
}

async function saveRefreshToken({ token, usuarioId, tipoUsuario, expiracao }) {
    // Registra o hash e os metadados necessários para validar ou revogar a sessão depois.
    const hashedToken = hashRefreshToken(token)

    await db.query(
        `INSERT INTO refresh_token (refresh_token_id, token_hash, tipo_usuario, usuario_id, expiracao)
        VALUES (?, ?, ?, ?, ?)`,
    [
        crypto.randomUUID(),
        hashedToken,
        tipoUsuario,
        usuarioId,
        expiracao
    ]);
}

async function findRefreshToken(token) {
    // Localiza a sessão pelo hash e retorna null quando ela não está cadastrada.
    const hash = hashRefreshToken(token);

    const result = await db.query(
        `SELECT *
         FROM refresh_token
         WHERE token_hash = ?`,
        [hash]
    );

    return result.length > 0 ? result[0] : null;

}

async function revokeRefreshToken(token) {
    // Marca a sessão como revogada sem guardar ou precisar devolver o token original.
    const hash = hashRefreshToken(token);

    await db.query(
        `UPDATE refresh_token
         SET revogado = 1
         WHERE token_hash = ?`,
        [hash]
    );

}

async function deleteExpiredRefreshTokens() {
    // Limpeza preparada para apagar registros expirados; não é chamada pelo fluxo atual.

    await db.query(
        `DELETE FROM refresh_token
         WHERE expiracao < NOW()`
    );

}

const tokenUtil = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    hashRefreshToken,
    saveRefreshToken,
    findRefreshToken,
    revokeRefreshToken
};

export default tokenUtil;

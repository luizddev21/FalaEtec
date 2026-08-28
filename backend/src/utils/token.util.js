import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import crypto from 'crypto';

function generateAccessToken(payload) {
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
    return (
        jwt.verify(
            token,
            process.env.ACCESS_SECRET
        )
    );
}

function verifyRefreshToken(token) {
    return (
        jwt.verify(
            token,
            process.env.REFRESH_SECRET
        )
    );
}

function hashRefreshToken(token) {
    return (
        crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')
    );
}

async function saveRefreshToken({ token, usuarioId, tipoUsuario, expiracao }) {

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

    const hash = hashRefreshToken(token);

    await db.query(
        `UPDATE refresh_token
         SET revogado = 1
         WHERE token_hash = ?`,
        [hash]
    );

}

async function deleteExpiredRefreshTokens() {

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
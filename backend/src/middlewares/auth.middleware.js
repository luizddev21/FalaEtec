import jwt from "jsonwebtoken";
import tokenUtil from "../utils/token.util.js";

export function auth(req, res, next) {

    const token = req.cookies.accessToken;

    if (!token)
        return res.sendStatus(401);

    try {
        req.user = tokenUtil.verifyAccessToken(token);

        next();
    } catch {
        return res.sendStatus(401);
    }

}

// Verifica se o usuário é um gestor
export function checkAdmin(req, res, next) {
    
    const token = req.cookies.accessToken;

    if (!token) 
        return res.sendStatus(401);

    try {
        req.user = tokenUtil.verifyAccessToken(token);

        if (!req.user === "gestor") return res.sendStatus(401);

        console.log("passou")
        next()
    } catch {
        return res.sendStatus(401);
    }

}
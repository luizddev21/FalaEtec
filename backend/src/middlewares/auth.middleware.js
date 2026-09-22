import tokenUtil from "../utils/token.util.js";

export const middleware = {
    auth(req, res, next) {

        const token = req.cookies.accessToken;

        if (!token)
            return res.sendStatus(401);

        try {
            req.user = tokenUtil.verifyAccessToken(token);

            next();
        } catch {
            return res.sendStatus(401);
        }

    },

    admin(req, res, next) {

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
}
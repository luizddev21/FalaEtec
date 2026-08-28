import jwt from "jsonwebtoken";

export default function auth(req, res, next) {

    const token = req.cookies.accessToken;

    if (!token)
        return res.sendStatus(401);

    try {
        req.user = jwt.verify(
            token,
            process.env.ACCESS_SECRET
        );

        next();
    } catch {
        return res.sendStatus(401);
    }

}
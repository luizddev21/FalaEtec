import tokenUtil from "../utils/token.util.js";

export const middleware = {
  auth(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    try {
      req.user = tokenUtil.verifyAccessToken(token);
      next();
    } catch {
      return res.status(401).json({
        error: "Invalid or expired token",
      });
    }
  },

  admin(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }

    try {
      req.user = tokenUtil.verifyAccessToken(token);

      if (!["gestor", "professor"].includes(req.user.type)) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      next();
    } catch {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
  },

  super(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }

    try {
      req.user = tokenUtil.verifyAccessToken(token);

      if (!["gestor"].includes(req.user.type)) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      next();
    } catch {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
  },
};

// Portas de entrada das rotas protegidas: valida o cookie de acesso e anexa
// as informações do token em req.user para controladores e serviços usarem.
import tokenUtil from "../utils/token.util.js";

export const middleware = {
  auth(req, res, next) {
    // Exige sessão válida para qualquer usuário autenticado.
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
    // Restringe recursos administrativos a professores e gestores.
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
    // Reservado ao gestor: usado nas operações de gerenciamento de cadastros.
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

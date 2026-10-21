// Camada HTTP fina para criar/apagar respostas; autorização ocorre na rota e
// as consultas e validações de domínio são executadas por answer.service.js.
import { imp } from "../services/answer.service.js";

export const controller = {
  async create(req, res) {
    try {
      const data = await imp.create(req.user, req.body);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const data = await imp.delete(req.body);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

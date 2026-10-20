import { imp } from "../services/turma.service.js";

export const controller = {
  async getAll(req, res) {
    try {
      const data = await imp.getAll(req.user);

      return res.status(200).json(data);
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

  async create(req, res) {
    try {
      const data = await imp.create(req.body);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const data = await imp.update(req.body);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  },
};

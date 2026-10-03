import { imp } from '../services/interaction.service.js';

export const controller = {
    async create(req, res) {

        try {
            const data = await imp.create(req.user, req.body, req.file);

            return res.status(201).json(data)
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },

    async getAll(req, res) {
        try {
            const data = await imp.getAll(req.user, req.body, req.query);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}
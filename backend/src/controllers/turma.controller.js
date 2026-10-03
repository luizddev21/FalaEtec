import { imp } from '../services/turma.service.js';

export const controller = {
    async getAll(req, res) {
        try {
            const data = await imp.getAll(req.user);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}
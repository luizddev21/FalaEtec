import { imp } from '../services/interaction.service.js';

export const controller = {
    async create(req, res) {

        console.log("Chegou aqui");
        console.log(req);

        try {
            const data = await imp.create(req.user, req.body, req.file);

            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },

    async getAll(req, res) {
        try {
            console.log("Body: ", req.body)
            const data = await imp.getAll(req.user, req.body);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },
}
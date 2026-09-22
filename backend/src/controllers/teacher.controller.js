import { imp } from '../services/teacher.service.js';

export const controller = {
    async getAllName(req, res) {

        try {
            const data = await imp.getAllName();

            return res.status(201).json(data);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }

    }
}
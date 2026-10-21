// Adaptador HTTP para as operações de perfil e contas; a regra de dados fica
// em user.service.js, enquanto esta camada escolhe o status e o JSON de retorno.
import { imp } from "../services/user.service.js";

export const controller = {
    async get(req, res) {
        try {

            const data = await imp.get(req.user);

            return res.status(200).json(data);

        } catch (error) {

            return res.status(500).json({
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const data = await imp.getAll(req.user);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },

    async teacherGetAllName(req, res) {

        try {
            const data = await imp.teacherGetAllName();

            return res.status(200).json(data);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: error.message
            })
        }

    },

    async create(req, res) {
        try {

            // Delega a validação e a gravação ao serviço de contas.
            const data = await imp.create(req.body);

            // Devolve ao cliente o resultado do cadastro com status HTTP de criação.
            return res.status(201).json(data);
        } catch (error) {

            // Converte a falha do serviço em resposta JSON para o cliente.
            return res.status(500).json({
                error: error.message
            });
        }
    },

    async changePassword(req, res) {
        try {
            const data = await imp.changePassword(req.body);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },

    async update(req, res) {
        try {
            const data = await imp.update(req.body);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },

    async delete(req, res) {
        try {
            const data = await imp.delete(req.body);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}

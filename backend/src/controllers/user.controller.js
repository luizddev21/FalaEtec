import { imp } from "../services/user.service.js";

export const controller = {
    async get(req, res) {
        try {

            const data = await imp.get(req.user);

            return res.status(201).json(data);

        } catch (error) {

            return res.status(500).json({
                error: error.message
            });
        }
    },

    async getAll(req, res) {
        try {
            const data = await imp.getAll(req.user);

            return res.status(201).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },

    async create(req, res) {
        try {
        
            // Chama a função responsável pelo registro do usuário e aguarda um retorno.
            const data = await imp.create(req.body);
        
            // Caso o retorno seja positivo, envia a mensagem ao servidor contendo o ID do usuário cadastrado.
            return res.status(201).json(data);
          } catch (error) {
        
            // Caso o retorno seja negativo, envia a mensagem ao servidor contendo a mensagem de erro.
            return res.status(400).json({
              error: error.message
            });
          }
    },

    async changePassword(req, res) {
        try {
            const data = await imp.changePassword(req.body);

            return res.status(200).json(data)
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
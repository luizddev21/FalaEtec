import { imp } from "../services/user.service.js";

export const user = {
    async getUser(req, res) {
        try {

            const data = await imp.getUser(req.user);

            return res.status(201).json(data);

        } catch (error) {

            return res.status(500).json({
                error: error.message
            });
        }
    },

    async getAllUser(req, res) {
        try {
            const data = await imp.getAllUser(req.user);

            return res.status(201).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },

    async createUser(req, res) {
        try {
        
            // Chama a função responsável pelo registro do usuário e aguarda um retorno.
            const data = await imp.createUser(req.body);
        
            // Caso o retorno seja positivo, envia a mensagem ao servidor contendo o ID do usuário cadastrado.
            return res.status(201).json(data);
          } catch (error) {
        
            // Caso o retorno seja negativo, envia a mensagem ao servidor contendo a mensagem de erro.
            return res.status(400).json({
              error: error.message
            });
          }
    },

    async changeUserPassword(req, res) {
        try {
            const data = await imp.changeUserPassword(req.body);

            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    },

    async deleteUser(req, res) {
        try {
            const data = await imp.deleteUser(req.body);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}
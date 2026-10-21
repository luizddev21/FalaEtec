// Camada HTTP da autenticação: chama o serviço, transforma tokens em cookies
// HttpOnly e devolve status/JSON adequados ao cliente web.
import { imp } from '../services/auth.service.js'

export const controller = {
  async login(req, res) {
    // Recebe credenciais JSON e, se aceitas, cria os cookies de sessão.
    try {

      const data = await imp.login(req.body);

      res.cookie("accessToken", data.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      });

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      });

      return res.status(200).json(data.user);
    } catch (error) {

      return res.status(400).json({
        error: error.message
      });
    }
  },

  async refresh(req, res) {
    // Lê o refresh token do cookie e substitui os cookies pelo par renovado.
    try {
      const refreshToken = req.cookies.refreshToken;

      const tokens = await imp.refresh(refreshToken);

      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      });

      return res.json({
        status: "success"
      })

    } catch (error) {
      return res.status(401).json({
        error: error.message
      })
    }
  },

  async logout(req, res) {
    // Revoga o refresh token no banco e limpa ambos os cookies no navegador.

    try {

      const refreshToken = req.cookies.refreshToken;

      await imp.logout(refreshToken);

      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      });

      return res.sendStatus(204);

    } catch (error) {

      return res.status(400).json({
        error: error.message
      });

    }
  },

  async checkAuth(req, res) {
    // O middleware auth já validou o cookie; confirma a sessão ao frontend com a identidade mínima.
    return res.status(200).json({
      authenticated: true,
      user: {
        id: req.user.sub,
        type: req.user.type
      }
    });

  },

  async checkAdmin(req, res) {
    // O middleware admin já validou o perfil; esta resposta permite liberar a área administrativa.
    return res.status(200).json({
      admin: true,
      user: {
        id: req.user.sub,
        type: req.user.type
      }
    });

  }
}

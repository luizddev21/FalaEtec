import { registerUser, loginUser, refreshUser, logoutUser } from '../services/auth.service.js'

export async function register(req, res) {
  try {

    // Chama a função responsável pelo registro do usuário e aguarda um retorno.
    const data = await registerUser(req.body);

    // Caso o retorno seja positivo, envia a mensagem ao servidor contendo o ID do usuário cadastrado.
    return res.status(201).json(data);
  } catch (error) {

    // Caso o retorno seja negativo, envia a mensagem ao servidor contendo a mensagem de erro.
    return res.status(400).json({
      error: error.message
    });
  }
}

export async function login(req, res) {
  try {

    const data = await loginUser(req.body);

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

    return res.status(201).json(data.user);
  } catch (error) {
    
    return res.status(400).json({
      error: error.message
    });
  }
}

export async function refresh(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    const tokens = await refreshUser(refreshToken);

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
}

export async function logout(req, res) {

    try {

        const refreshToken = req.cookies.refreshToken;

        await logoutUser(refreshToken);

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
}
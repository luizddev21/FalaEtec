import { loginUser, refreshUser, logoutUser } from '../services/auth.service.js'

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

    return res.status(200).json(data.user);
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

export async function checkAuth(req, res) {

    return res.status(200).json({
        authenticated: true,
        user: {
            id: req.user.sub,
            type: req.user.type
        }
    });
    
}
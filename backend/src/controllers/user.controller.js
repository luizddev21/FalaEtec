import { getProfile } from "../services/user.service.js";

export async function profile(req, res) {

    try {

        const data = await getProfile(req.user);

        return res.status(200).json(data);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
}
import { getNameOfTeachers } from '../services/teacher.service.js';

export async function nameOfTeachers(req, res) {

    try {
        const data = await getNameOfTeachers();

        return res.status(201).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message
        })
    }

}
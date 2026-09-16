import db from '../config/db.js';

export async function getNameOfTeachers() {
    //TODO Pegar todos os nomes dos professores existentes

    const teachers = await db.query(
        `SELECT nome FROM professor`
    );

    const data = [];

    teachers.forEach(teacher => {
        if (teacher.nome !== undefined) {
            data.push(teacher.nome);
        }
    });

    return data;
}
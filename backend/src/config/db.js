// Cria o pool de conexões MariaDB usado pelos serviços para ler e gravar
// alunos, equipe escolar, interações, respostas, turmas e cursos.
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: precess.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const conn = await pool.getConnection();

// Libera a conexão de inicialização para o pool; o objeto de conexão exportado
// é compartilhado pelos módulos de serviço para executar suas consultas.
conn.release();

export default conn;

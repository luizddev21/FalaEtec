// Cria o pool de conexões MariaDB usado pelos serviços para ler e gravar
// alunos, equipe escolar, interações, respostas, turmas e cursos.
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "3386",
    database: "falaetec"
});

const conn = await pool.getConnection();

// Libera a conexão de inicialização para o pool; o objeto de conexão exportado
// é compartilhado pelos módulos de serviço para executar suas consultas.
conn.release();

export default conn;

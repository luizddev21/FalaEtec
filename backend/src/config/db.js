import 'dotenv/config';
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    connectTimeout: 5000,
    acquireTimeout: 10000
});

const conn = await pool.getConnection();

console.log('Banco de dados conectado com sucesso!');

conn.release();

export default pool;

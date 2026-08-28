import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "3386",
    database: "falaetec"
});

const conn = await pool.getConnection();

conn.release();

export default conn;
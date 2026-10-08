import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "falaetec"
});

const conn = await pool.getConnection();

conn.release();

export default conn;
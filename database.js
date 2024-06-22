import mysql from 'mysql2'
const pool = mysql.createPool({
    host: 'localhost',
    port: 3310,
    user: 'root',
    password:'123456',
    database: 'thang',
    waitForConnections: true,
    connectionLimit: 0,
    queueLimit: 10,
})
export default pool

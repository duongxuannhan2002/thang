import mysql from 'mysql2'
const pool = mysql.createPool({
    host: 'bxlbmmz5f9s7rjy7e4gx-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'uzoertu66xdfeico',
    password:'Iqz8DZPMXS0uC1E3mQY5',
    database: 'bxlbmmz5f9s7rjy7e4gx',
    waitForConnections: true,
    connectionLimit: 0,
    queueLimit: 10,
})
export default pool

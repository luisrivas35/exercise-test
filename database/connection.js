import 'dotenv/config'
import pg from 'pg'
const { Pool } = pg

export const pool = new Pool({
    allowExitOnIdle: true,
    connectionString: process.env.CONNECTION_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

try {
    const time = await pool.query('SELECT NOW()')
    console.log('db conectada!' + time.rows[0].now)
} catch (error) {
    console.log(error)
}
const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres', 
    password: 'Maxpass21_@', 
    host: 'localhost',
    port: 5432,
    database: 'db_movie',
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    });
    
    module.exports = pool;
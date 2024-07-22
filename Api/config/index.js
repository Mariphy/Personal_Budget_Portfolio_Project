const Pool = require('pg').Pool;
require('dotenv').config();
 
const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});

const query = (text, params, callback) => {
    return pool.query(text, params, callback)
};

module.exports = {query};
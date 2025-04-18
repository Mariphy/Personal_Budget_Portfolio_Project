const Pool = require('pg').Pool;
require('dotenv').config();
 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const query = (text, params) => {
    console.log('Connecting to:', process.env.DATABASE_URL);

    return new Promise((resolve, reject) => {
      pool.query('SELECT NOW()')
        .then(res => console.log('Connected! Time:', res.rows[0].now))
        .catch(err => console.error('Connection error:', err.message));
      pool.query(text, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  };

module.exports = {query};
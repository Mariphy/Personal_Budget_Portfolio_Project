const Pool = require('pg').Pool;
require('dotenv').config();
 
const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});

const query = (text, params) => {
    return new Promise((resolve, reject) => {
      pool.query(text, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  };

module.exports = {query};
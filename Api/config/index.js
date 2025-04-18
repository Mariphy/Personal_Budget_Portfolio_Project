const Pool = require('pg').Pool;
require('dotenv').config();
 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
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
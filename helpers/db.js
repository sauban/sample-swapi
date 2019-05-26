const mysql = require('mysql');

const { databaseUrl } = require('./config');
// local mysql db pool

const pool = mysql.createPool(databaseUrl);

module.exports = {
  query(qryString, qryParams = []) {
    return new Promise(async (resolve, reject) => {
      try {
        pool.query(qryString, qryParams, async (err, res) => {
          if (err) return reject(err);
          return resolve(res);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

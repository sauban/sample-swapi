const mysql = require('mysql');

const { databaseUrl } = require('./config');
// local mysql db connection

function makeDbConnection() {
  const connection = mysql.createConnection(databaseUrl);
  let connected = false;

  const connect = () => new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) return reject(err);
      connected = true;
      return resolve(connection);
    });
  });

  return {
    query(qryString, qryParams = []) {
      return new Promise(async (resolve, reject) => {
        try {
          if (!connected) {
            await connect();
          }
          connection.query(qryString, qryParams, async (err, res) => {
            if (err) return reject(err);
            return resolve(res);
          });
        } catch (error) {
          reject(error);
        }
      });
    },

    close() {
      return new Promise((resolve, reject) => {
        if (connected) {
          connection.end((err) => {
            if (err) return reject(err);
            connected = false;
            return resolve(null);
          });
        } else {
          resolve(null);
        }
      });
    },
  };
}

module.exports = makeDbConnection;

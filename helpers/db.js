require('dotenv').config();

const mysql = require('mysql');

const { databaseUrl } = require('./config');
// local mysql db connection

class MysqlConnect {
  constructor() {
    this.connection = mysql.createConnection(databaseUrl);
    this.connected = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) return reject(err);
        this.connected = true;
        return resolve(this.connection);
      });
    });
  }

  query(qryString, qryParams = []) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.connected) {
          await this.connect();
        }
        this.connection.query(qryString, qryParams, async (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      if (this.connected) {
        this.connection.end((err) => {
          if (err) return reject(err);
          this.connected = false;
          return resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  }
}

module.exports = MysqlConnect;

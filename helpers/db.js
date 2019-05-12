require('dotenv').config();

const mysql = require('mysql');

const { databaseUrl } =  require('./config');
//local mysql db connection

class MysqlConnect {
    constructor(){
        this.connection = mysql.createConnection(databaseUrl);
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) reject(err);
                resolve(this.connection);
            });
        })
    }
    close() {
        if (this.connection) {
            this.connection.end((err) => {
                if (err) throw err;
            });
        }
    }
}

module.exports = MysqlConnect;
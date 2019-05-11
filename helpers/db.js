require('dotenv').config();

const mysql = require('mysql');

const { databaseUrl } =  require('./config');
//local mysql db connection
const connection = mysql.createConnection(databaseUrl);

connection.connect((err) => {
    if (err) throw err;
    console.log('Connection to db successful');
});

module.exports = connection;
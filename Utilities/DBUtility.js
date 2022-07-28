const mysql = require('mysql2');
const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "hydr1d";
const DB_PORT = process.env.DB_PORT || 3306;

//We could use ORM has well but as it is an assessment I thought it will be good to use direct SQL.
var connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

connection.connect((err) => {
    if(!err)
        console.log('Connected to database successfully!');
    else
        console.log('Error while connecting to database : '+ JSON.stringify(err, undefined,2));
});

module.exports = connection;
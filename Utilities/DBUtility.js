const mysql = require('mysql2');
const { DATA_BASE_CONFIG } = require('../config');


//We could use ORM has well but as it is an assessment I thought it will be good to use direct SQL.
var connection = mysql.createConnection({
    host: DATA_BASE_CONFIG.HOST,
    port: DATA_BASE_CONFIG.PORT,
    user: DATA_BASE_CONFIG.USER,
    password: DATA_BASE_CONFIG.PASSWORD,
    database: DATA_BASE_CONFIG.DB
});

connection.connect((err) => {
    if (!err)
        console.log('Connected to database successfully!');
    else
        console.log('Error while connecting to database : ' + JSON.stringify(err, undefined, 2));
});

module.exports = connection;
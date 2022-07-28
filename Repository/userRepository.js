const connection = require("../Utilities/DBUtility");

module.exports = {
    insertUser: (username, password, type) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO users
                                (username, password, type)
                            VALUES
                                ('${username}', '${password}', '${type}');`, 
                (error, results, fields) => {
                    if (error) return reject(error);
                    if (results) return resolve(results);
                }
            );
        });
    }
}

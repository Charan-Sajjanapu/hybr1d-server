const connection = require("../Utilities/DBUtility");

module.exports = {
    insertUser: (username, password, type) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO users (username, password, type) VALUES ('${username}', '${password}', '${type}');`
            connection.query(query, (err, res, fields) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    },

    verifyLogin: (username, password) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM users WHERE username='${username}' and password='${password}';`
            connection.query(query, (err, res, fields) => {
                if (err) return reject(err);
                return resolve(res);
            });
        });
    }
}

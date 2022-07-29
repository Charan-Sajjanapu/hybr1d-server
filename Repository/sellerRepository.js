const connection = require("../Utilities/DBUtility");

module.exports = {
    addProducts: (productsList) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO products (name, price, sellerId) VALUES `;
            query += productsList.map(e => `('${e.name}', ${e.price}, ${e.sellerId})`).join(", ") + ";";
            connection.query(query, (err, res, fields) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    }
}
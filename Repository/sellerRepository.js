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
    },

    getOrders: (sellerId) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT o.*, GROUP_CONCAT(p.id,'++',p.name,'++',p.price) AS products FROM orders o INNER JOIN orderProductMapping op ON o.id = op.orderid AND o.sellerId = ${sellerId} INNER JOIN products p ON op.productId = p.id GROUP BY o.id;`;
            console.log(query);
            connection.query(query, (err, res, fields) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    }
}
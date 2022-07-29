const { USER_TYPE, ERRORS } = require("../Utilities/CONSTANTS");
const connection = require("../Utilities/DBUtility");

module.exports = {
    getSellersList: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT id, username FROM users WHERE type='${USER_TYPE.SELLER}';`;
            connection.query(query, (err, res, fields) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    },

    getSellerCatalog: (sellerId) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT id, name, price FROM products WHERE sellerId=${sellerId};`;
            connection.query(query, (err, res, fields) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    },

    verifyProductAndSeller: (sellerId, products) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT id FROM products WHERE `;
            query += products.map(e => `id = ${e.id} AND sellerId = ${sellerId}`).join(" OR ") + ";";
            connection.query(query, (err, res, fields) => {
                if (err)
                    return reject(err);
                return resolve(res);
            });
        });
    },

    placeOrder: (buyerId, sellerId, products) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO orders(buyerId, sellerId) VALUES (${buyerId}, ${sellerId});`;
            console.log(query);
            connection.query(query, (err, res, fields) => {
                if (err)
                    return reject(err);
                console.log(res);
                if (res && res.insertId) {
                    query = `INSERT INTO orderProductMapping(orderId, productId) VALUES`;
                    query += products.map(e => `(${res.insertId}, ${e.id})`).join(",") + ";";
                    connection.query(query, (err, res, fields) => {
                        if (err)
                            return reject(err);
                        return resolve(res);
                    });
                } else {
                    return reject(ERRORS.SERVER_ERROR);
                }
            });

        });
    }
}
const sellerRepository = require("../Repository/sellerRepository");
const { ERRORS, USER_TYPE } = require("../Utilities/CONSTANTS");

module.exports = {
    addProducts: (user, req) => {
        return new Promise((resovle, reject) => {
            if (user && user.id && user.type == USER_TYPE.SELLER) {
                let products = req.filter(e => e.name && e.price).map(e => ({ ...e, sellerId: user.id }));
                if (products && products.length) {
                    sellerRepository.addProducts(products).then(data => {
                        return resovle(data);
                    }).catch(err => {
                        let error = ERRORS.SERVER_ERROR;
                        error.msg = err;
                        return reject(error);
                    })
                } else {
                    return reject(ERRORS.INVALID_DATA);
                }
            } else {
                return reject(ERRORS.INVALID_DATA);
            }
        });
    },

    getOrders: (user) => {
        return new Promise((resovle, reject) => {
            sellerRepository.getOrders(user.id).then(data => {
                console.log(data);
                if (data && data.length) {
                    data = data.map(e => ({ ...e, products: e.products.split(",").map(se => ({ id: se.split("++")[0], name: se.split("++")[1], price: se.split("++")[2] })) }));
                }
                return resovle(data);
            }).catch(err => {
                let error = ERRORS.SERVER_ERROR;
                error.msg = err;
                return reject(error);
            })
        });
    }
}
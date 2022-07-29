const buyerRepository = require("../Repository/buyerRepository");
const { ERRORS, USER_TYPE } = require("../Utilities/CONSTANTS");

module.exports = {
    getSellersList: (user) => {
        return new Promise((resolve, reject) => {
            buyerRepository.getSellersList().then(data => {
                return resolve(data);
            }).catch(err => {
                let error = ERRORS.SERVER_ERROR;
                error.msg = err;
                return reject(error);
            });
        });
    },

    getSellerCatalog(user, req) {
        return new Promise((resolve, reject) => {
            if (req.seller_id) {
                buyerRepository.getSellerCatalog(req.seller_id).then(data => {
                    return resolve(data);
                }).catch(err => {
                    let error = ERRORS.SERVER_ERROR;
                    error.msg = err;
                    return reject(error);
                });
            } else {
                return reject(ERRORS.INVALID_DATA);
            }
        });
    },

    placeOrder(user, params, products) {
        return new Promise((resolve, reject) => {
            products = products.filter(e => e.id);
            if (params.seller_id && products && products.length) {
                buyerRepository.verifyProductAndSeller(params.seller_id, products).then(res => {
                    if (res.length == products.length) {
                        buyerRepository.placeOrder(user.id, params.seller_id, products).then(data => {
                            return resolve(data);
                        }).catch(err => {
                            let error = ERRORS.SERVER_ERROR;
                            error.msg = err;
                            return reject(error);
                        });
                    } else {
                        return reject(ERRORS.INVALID_DATA);
                    }
                }).catch(err => {
                    let error = ERRORS.SERVER_ERROR;
                    error.msg = err;
                    return reject(error);
                })
            } else {
                return reject(ERRORS.INVALID_DATA);
            }
        });
    }
}
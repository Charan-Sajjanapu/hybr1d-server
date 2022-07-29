const sellerRepository = require("../Repository/sellerRepository");
const { ERRORS } = require("../Utilities/CONSTANTS");

module.exports = {
    addProducts: (user, req) => {
        return new Promise((resovle, reject) => {
            if (user && user.id) {
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
    }
}
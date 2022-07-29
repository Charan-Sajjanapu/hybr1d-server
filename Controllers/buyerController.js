const buyerService = require("../Services/buyerService")

module.exports = {
    getSellersList: (req, res) => {
        buyerService.getSellersList(req.user).then((result) => {
            res.status(200).json({ 'sellers': result });
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    },

    getSellerCatalog: (req, res) => {
        buyerService.getSellerCatalog(req.user, req.params).then((result) => {
            res.status(200).json({ 'products': result });
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    },

    createOrder: (req, res) => {
        buyerService.placeOrder(req.user, req.params, req.body).then((result) => {
            res.status(200).json({ 'result': result });
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    }
}
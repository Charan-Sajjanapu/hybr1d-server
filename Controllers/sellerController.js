const sellerService = require("../Services/sellerService")

module.exports = {
    addProducts: (req, res) => {
        sellerService.addProducts(req.user, req.body).then((result) => {
            res.status(200).json({ 'result': result });
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    },

    getOrders: (req, res) => {
        sellerService.getOrders(req.user).then((result) => {
            res.status(200).json({ 'orders': result });
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    }
}
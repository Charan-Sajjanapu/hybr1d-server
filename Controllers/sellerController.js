const sellerService = require("../Services/sellerService")

module.exports = {
    addProducts: (req, res) => {
        sellerService.addProducts(req.user, req.body).then((result) => {
            res.status(200).json({ 'data': result });
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    }
}
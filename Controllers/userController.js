const userService = require("../Services/userService");

module.exports = {
    registerUser: (req, res) => {
        userService.registerUser(req.body).then((result) => {
            res.status(200).json({ 'result': result });
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    },

    loginUser: (req, res) => {
        userService.verifyLogin(req.body).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    }
}
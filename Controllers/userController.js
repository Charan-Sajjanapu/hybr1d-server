const userService = require("../Services/userService");

module.exports = {
    registerUser: (req, res) => {
        userService.registerUser(req.body).then((result) => {
            res.status(200).json({'data': result });
        }).catch((err) => {
            res.status(err.statusCode).send(err.msg);
        });
    }
}
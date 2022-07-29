const jwt = require('jsonwebtoken');
const { AUTH_SECRET_KEY } = require('../config');

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(user, AUTH_SECRET_KEY, { expiresIn: '1800s' });
    },

    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null)
            return res.sendStatus(401)

        jwt.verify(token, AUTH_SECRET_KEY, (err, user) => {
            if (err)
                return res.sendStatus(403)
            req.user = user;
            next()
        });
    },

    authorizeRoles: (allowedUserTypes) => {
        return (req, res, next) => {
            if (req.user && req.user.type && allowedUserTypes.includes(req.user.type)) {
                next();
            } else {
                return res.sendStatus(401);
            }
        };
    }
}
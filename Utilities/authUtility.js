const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(user, process.env.HYBR1D_AUTH_KEY, { expiresIn: '1800s' });
    },

    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null)
            return res.sendStatus(401)

        jwt.verify(token, process.env.HYBR1D_AUTH_KEY, (err, user) => {
            if (err)
                return res.sendStatus(403)
            req.user = user;
            next()
        });
    }
}
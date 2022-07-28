const userRepository = require('../Repository/userRepository');
const { USER_TYPE, ERRORS } = require('../Utilities/CONSTANTS');


module.exports = {
    registerUser: (req) => {
        return new Promise((resolve, reject) => {
            if (req && req.username && req.password && req.type && Object.values(USER_TYPE).includes(req.type)) {
                userRepository.insertUser(req.username, req.password, req.type).then(data => {
                    return resolve(data);   
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
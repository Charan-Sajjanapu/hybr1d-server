exports.USER_TYPE = {
    BUYER: 'buyer',
    SELLER: 'seller'
}

exports.ERRORS = {
    INVALID_DATA: { statusCode: 400, msg: "Invalid Data!" },
    SERVER_ERROR: { statusCode: 500, msg: "Internal server error, please try after some time!" },
    INCORRECT_CREDENTIALS: { statusCode: 401, msg: "Incorrect username or password!" }
}
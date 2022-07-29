require('dotenv').config(); 
exports.SERVER_PORT = process.env.PORT || 3000;

exports.DATA_BASE_CONFIG = {
    HOST: process.env.DB_HOST || "127.0.0.1",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: process.env.DB_NAME || "hydr1d",
    PORT: process.env.DB_PORT || 3306
}

let defaultAuthKey = '5a784e425247354fdfd9613b8e771d2c14ee88b651ccf2b7a299339320ac9881248f26800d63601fd62b8ce123ca21f4ec942bf7ce7a91e1e5fbee42c2fecbd0';
exports.AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY || defaultAuthKey;
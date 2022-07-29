const express = require('express');
const app = express();
const cors = require("cors");
const userController = require("./Controllers/userController");
const bodyParser = require('body-parser');
const { authenticateToken, authorizeRoles } = require('./Utilities/authUtility');
const sellerController = require('./Controllers/sellerController');
const buyerController = require('./Controllers/buyerController');
const { SERVER_PORT } = require('./config');
const { USER_TYPE } = require('./Utilities/CONSTANTS');


app.use(cors());
app.use(bodyParser.json());

app.post('/api/auth/register', userController.registerUser);
app.post('/api/auth/login', userController.loginUser);
app.post('/api/seller/create-catalog', authenticateToken, authorizeRoles([USER_TYPE.SELLER]), sellerController.addProducts);
app.get('/api/buyer/list-of-sellers', authenticateToken, authorizeRoles([USER_TYPE.BUYER]), buyerController.getSellersList);
app.get('/api/buyer/seller-catalog/:seller_id', authenticateToken, authorizeRoles([USER_TYPE.BUYER]), buyerController.getSellerCatalog);
app.post('/api/buyer/create-order/:seller_id', authenticateToken, authorizeRoles([USER_TYPE.BUYER]), buyerController.createOrder);
app.get('/api/seller/orders', authenticateToken, authorizeRoles([USER_TYPE.SELLER]), sellerController.getOrders);

app.listen(SERVER_PORT, () => {
    console.log(`App listening on port ${SERVER_PORT}`)
})
const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
const userController = require("./Controllers/userController");
const bodyParser = require('body-parser');
const { authenticateToken } = require('./Utilities/authUtility');
const sellerController = require('./Controllers/sellerController');
const buyerController = require('./Controllers/buyerController');


app.use(cors());
app.use(bodyParser.json());

app.post('/api/auth/register', userController.registerUser);
app.post('/api/auth/login', userController.loginUser);
app.post('/api/seller/create-catalog', authenticateToken, sellerController.addProducts);
app.get('/api/buyer/list-of-sellers', authenticateToken, buyerController.getSellersList);
app.get('/api/buyer/seller-catalog/:seller_id', authenticateToken, buyerController.getSellerCatalog);
app.post('/api/buyer/create-order/:seller_id', authenticateToken, buyerController.createOrder);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
const userController = require("./Controllers/userController");
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());

app.post('/api/auth/register', userController.registerUser);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
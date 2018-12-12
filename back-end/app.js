const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ConnectionsConfig = require('./config/database');
const RoutesAccount = require('./routes/account-route');
const PORT = 3000;
const app = express();

ConnectionsConfig.mongo.start();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('ola meus pequenos gafanhotos!!!!!');
});

RoutesAccount.start(app);

const callback = () => {
    console.log(`Server running on port ${PORT}`);
};

app.listen(PORT, callback);
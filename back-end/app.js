const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ConnectionsConfig = require('./config/database');
const RoutesAccount = require('./routes/account-route');
const PORT = 3001;
const app = express();

ConnectionsConfig.mongo.start();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT.HEAD,DELETE,OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.json('ola meus pequenos gafanhotos!!!!!');
});

RoutesAccount.start(app);

const callback = () => {
    console.log(`Server running on port ${PORT}`);
};

app.listen(PORT, callback);
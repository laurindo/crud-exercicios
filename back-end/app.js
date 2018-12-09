const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connection = require('./config/database');
const PORT = 3000;
const app = express();

// CONFIGURATION MONGOOSE
const connectionInstance = mongoose.createConnection(connection.URL);
connectionInstance.on('open', () => {
    console.log('connected');
});

connectionInstance.on('error', () => {
    console.log('connection failed');
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('ola meus pequenos gafanhotos!!!!!');
});

app.get('/accounts', (req, res) => {
    connectionInstance.db.collection('accounts').find({}).toArray((error, documents) => {
        if (error) {
            return res.status(400).json('error');
        }
        res.json(documents);
    });
});

app.post('/account', (req, res) => {
    const data = req.body;
    const options = {};
    const callback = (error, documentCreated) => {
        if (error) {
            return res.status(400).json(error);
        }
        res.json(documentCreated);
    };
    connectionInstance.db.collection('accounts').insertOne(data, options, callback);
});

app.put('/account', (req, res) => {
    console.log(req.body);
    const data = req.body;
    data.name = "account 03 updated";
    res.json(data);
});

app.delete('/account', (req, res) => {
    const query = req.query;
    res.json(query);
});

const callback = () => {
    console.log(`Server running on port ${PORT}`);
};

app.listen(PORT, callback);
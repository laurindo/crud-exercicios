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

app.get('/account', (req, res) => {
    connectionInstance.db.collection('accounts').find({}).toArray((error, documents) => {
        if (error) {
            return res.status(400).json('error');
        }
        res.json(documents);
    });
});

app.get('/account/:id', (req, res) => {
    const id = req.params.id;
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const callback = (error, documents) => {
        if (error) {
            return res.status(400).json('error');
        }
        res.json(documents);
    };
    connectionInstance.db.collection('accounts').findOne(filter, callback);
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
   const id = req.query.id;
   const data = { $set: req.body };
   const filter = { _id: mongoose.Types.ObjectId(id) };
   const options = {};
   const callback = (error, documentUpdated) => {
       if (error) {
        return res.status(400).json(error);
       }
       res.json(documentUpdated);
   };
   connectionInstance.db.collection('accounts').updateOne(filter, data, options, callback);
});

app.delete('/account', (req, res) => {
    const id = req.query.id;
    const options = {};
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const callback = (error, documentDeleted) => {
        if (error) {
            return res.status(400).json(error);
        }
        res.json(documentDeleted);
    };
    connectionInstance.db.collection('accounts').deleteOne(filter, options, callback);
});

const callback = () => {
    console.log(`Server running on port ${PORT}`);
};

app.listen(PORT, callback);
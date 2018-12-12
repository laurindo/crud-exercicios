const mongoose = require('mongoose');
const GeneralConstants = require('../constants/general-constant');
const ConnectionsConfig = require('../config/database');
const connectionInstance = ConnectionsConfig.mongo.getInstance;
const COLLECTIONS = GeneralConstants.COLLECTIONS;

exports.listAllAccounts = async (req, res) => {
    connectionInstance().db.collection(COLLECTIONS.accounts).find({}).toArray((error, documents) => {
        if (error) {
            return res.status(400).json('error');
        }
        res.json(documents);
    });
};

exports.listAccountById = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const callback = (error, documents) => {
        if (error) {
            return res.status(400).json('error');
        }
        res.json(documents);
    };
    connectionInstance().db.collection(COLLECTIONS.accounts).findOne(filter, callback);
};

exports.createAccount = async (req, res) => {
    const data = req.body;
    const options = {};
    const callback = (error, documentCreated) => {
        if (error) {
            return res.status(400).json(error);
        }
        res.json(documentCreated);
    };
    connectionInstance().db.collection(COLLECTIONS.accounts).insertOne(data, options, callback);
};

exports.updateAccount = async (req, res) => {
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
    connectionInstance().db.collection(COLLECTIONS.accounts).updateOne(filter, data, options, callback);
 };

 exports.deleteAccount = async (req, res) => {
    const id = req.query.id;
    const options = {};
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const callback = (error, documentDeleted) => {
        if (error) {
            return res.status(400).json(error);
        }
        res.json(documentDeleted);
    };
    connectionInstance().db.collection(COLLECTIONS.accounts).deleteOne(filter, options, callback);
};
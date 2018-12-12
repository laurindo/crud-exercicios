const mongoose = require('mongoose');

const instances = {
    mongo: null,
    postgres: null,
    mysql: null
};

// CONFIGURATION MONGOOSE
exports.mongo = {
    start: async () => {
        const connection = {
            URL: 'mongodb://usercrud:123Crud@ds159631.mlab.com:59631/crud'
        };
        
        instances.mongo = mongoose.createConnection(connection.URL);

        instances.mongo.on('open', () => {
            console.log('connected');
        });
        
        instances.mongo.on('error', () => {
            console.log('connection failed');
        });
    },
    getInstance: () => {
        return instances.mongo;
    }
};

//exports.postgres = {};

//exports.mysql = {};
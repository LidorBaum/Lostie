const mongoose = require('mongoose');
const config = require('../../config');

const DB_URL = config.dbURL;

const ConnectionOptions = {
    socketTimeoutMS: 0,
    connectTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 120000,
};
let DBConnection = mongoose.createConnection(DB_URL, ConnectionOptions);

DBConnection.on('open', () => {
    console.log('Create connection...');
});

DBConnection.on('connecting', () => {
    console.log('Connecting to database...');
});

DBConnection.on('connected', () => {
    console.log('Connected to database...');
});

DBConnection.on('error', err => {
    const fullErrStack = `${err.reason ? JSON.stringify(err.reason) : ''} ${
        err.stack
    }`;
    console.log(fullErrStack);

    DBConnection = mongoose.createConnection(DB_URL, ConnectionOptions);
});

module.exports = {
    connection: DBConnection,
    mongoose,
};

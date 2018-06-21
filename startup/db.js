const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function (){
    mongoose.connect('mongodb://localhost/vidly', {
        autoReconnect: false,
        bufferMaxEntries: 0
    })
    .then(() => winston.info('Connected'));
}
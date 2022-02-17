'use strict';
const mongoose = require('mongoose');

module.exports = () => {
    // local db = 'mongodb://localhost/upload-files-database'
    mongoose.connect('mongodb+srv://arjad:123@cluster0.4tq8v.mongodb.net/img_db?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    }).then(() => console.log('Connected to Mongodb......'));
}
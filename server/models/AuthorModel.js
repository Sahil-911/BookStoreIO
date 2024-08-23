const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email']
    },
    birthDate: {
        type: Date,
        required: [true, 'Please provide a birth date']
    }
});

module.exports = mongoose.model('Author', AuthorSchema);
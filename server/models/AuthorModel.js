const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: [true, 'Please provide a name']
    },
    authorMail: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email']
    },
    birthDate: {
        type: Date,
        required: [true, 'Please provide a birth date']
    }
});

module.exports = mongoose.model('Author', AuthorSchema);
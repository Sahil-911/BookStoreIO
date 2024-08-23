const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, 'Please provide a title']
    },
    ISBNCode: {
        type: String,
        unique: true,
        required: [true, 'Please provide an ISBN code']
    },
    AuthorId: {
        type: String,
        required: [true, 'Please provide an Author ID']
    }
});

module.exports = mongoose.model('Book', BookSchema);
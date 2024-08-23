const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a title']
    },
    ISBNCode: {
        type: String,
        required: [true, 'Please provide an ISBN code']
    },
    AuthorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, 'Please provide an Author ID']
    }
});

module.exports = mongoose.model('Book', BookSchema);
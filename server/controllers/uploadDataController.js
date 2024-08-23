const mongoose = require('mongoose');
const Author = require('../models/AuthorModel');
const Book = require('../models/BookModel');

const uploadData = async (req, res) => {
    try {
        const authors = await Author.insertMany(req.body.authors);
        const books = await Book.insertMany(req.body.books);
        res.status(201).json({ authors, books });
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = { uploadData };
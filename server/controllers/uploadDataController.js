const mongoose = require('mongoose');
const Author = require('../models/AuthorModel');
const Book = require('../models/BookModel');

// Helper function to parse date from "dd-MM-yyyy" to Date object
const parseDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') {
        throw new Error('Invalid date format');
    }
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`);
};

const uploadData = async (req, res) => {
    try {
        const data = req.body;

        for (let i = 0; i < data.length; i++) {
            const bookData = data[i];

            console.log(bookData);

            if (!bookData['Date of Birth'] || !bookData['Author Email'] || !bookData['Author Id'] || !bookData.Author || !bookData.Name || !bookData.ISBNCode) {
                return res.status(400).json({ error: `Missing required fields in entry ${i + 1}` });
            }

            let author = await Author.findOne({ authorMail: bookData['Author Email'] });
            if (!author) {
                author = new Author({
                    authorName: bookData.Author,
                    authorMail: bookData['Author Email'],
                    birthDate: parseDate(bookData['Date of Birth'])
                });
                await author.save();
            }

            let book = await Book.findOne({ ISBNCode: bookData.ISBNCode });
            if (!book) {
                book = new Book({
                    bookName: bookData.Name,
                    ISBNCode: bookData.ISBNCode,
                    AuthorId: author._id // Use the MongoDB generated _id field
                });
                await book.save();
            }
        }

        res.status(201).json({ message: 'Data successfully saved' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving data: ' + error.message });
    }
};

module.exports = { uploadData };

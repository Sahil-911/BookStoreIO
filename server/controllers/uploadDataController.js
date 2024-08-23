const mongoose = require('mongoose');
const Author = require('../models/AuthorModel');
const Book = require('../models/BookModel');

const uploadData = async (req, res) => {
    try {

         console.log(req.body);
        const data = req.body;
         for (let item of data) {
            const {
                Author: authorName, 
                "Author Email": authorMail, 
                "Date of Birth": birthDate, 
                "ISBNCode": ISBNCode, 
                "Author Id": authorId,
                Name: bookName 
            } = item;

            let author = await Author.findOne({ authorMail });

            if (!author) {
                author = new Author({
                    authorName: authorName,
                    authorMail: authorMail,
                    birthDate: new Date(birthDate), 
                });
                await author.save();
            }

            let book = await Book.findOne({ ISBNCode });

            if (!book) {
                book = new Book({
                    bookName: bookName,
                    ISBNCode: ISBNCode,
                    AuthorId: authorId,
                });
                await book.save();
            }
        }

        res.status(200).json({ message: 'Data uploaded in the dataBase!' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports = { uploadData };
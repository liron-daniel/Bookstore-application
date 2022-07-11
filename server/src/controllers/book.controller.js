import Book from "../models/book.model.js";

export const createBook = async (req, res) => {
    const data = req.body;
    const book = new Book(data);

    try {
        await book.save();
        
        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: {book: book},
            message: 'Book was created successfully'
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: ''
        });
    }
};

export const updateBook = async (req, res) => {
    const bookID = req.params.bookID;
    const data = req.body;
    if(data.pages) data.pages = parseFloat(data.pages);
    if(data.price) data.price = parseFloat(data.price);

    try {
        await Book.updateOne({_id: bookID}, data);

        const book = await Book.findById(bookID);

        // await book.save();

        res.status(202).send({
            status: 202,
            statusText: 'Accepted',
            data: {book: book},
            message: 'Book was updated successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};

export const deleteBook = async (req, res) => {
    const bookID = req.params.bookID;

    try {
        await Book.findByIdAndDelete(bookID);

        res.send({
            status: 200,
            statusText: 'Ok',
            data: {},
            message: 'Book was deleted successfully'
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (!books) throw new Error();

        res.send({
            status: 200,
            statusText: 'Ok',
            data: {books: books},
            message: ''
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};

export const getBookData = async (req, res) => {
    const bookID = req.params.bookID;
    if (!bookID) {
        return res.status(400).send({
            status: 400,
            statusText: 'Bad Request',
            message: ''
        });
    }

    try {
        const book = await Book.findById(bookID);
        if (!book) throw new Error();

        res.send({
            status: 200,
            statusText: 'Ok',
            data: {book: book},
            message: ''
        });
    } catch (err) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: ''
        });
    }
};
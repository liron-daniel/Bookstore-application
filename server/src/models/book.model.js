import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required']
    },
    bookCover: {
        type: String,
        required: [true, 'BookCover url is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    pages: {
        type: Number,
        required: [true, 'Number of pages is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    }
});

bookSchema.methods.toJSON = function () {
    const book = this;
    const bookObj = book.toObject();

    delete bookObj.__v;

    return bookObj;
};

const Book = mongoose.model('Book', bookSchema);

export default Book;
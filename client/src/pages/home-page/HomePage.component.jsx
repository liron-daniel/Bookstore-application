import React, {useEffect, useState} from "react";
import environments from "../../environments/environments.js";
import './home-page.styles.css';

import Loader from "../../components/shared/loader/Loader.component.jsx";
import Book from "../../components/book/Book.component.jsx";

import { getAllBooks } from "../../services/book.service.js";

import { LOADER_TIMEOUT } from "../../constants/constants.js";

const API_URL = environments.REACT_APP_API_URL;

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await getAllBooks();
                const {books} = response.data;

                setBooks(books);

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
            } catch (err) {
                console.log(err);
                alert('Something went wrong!');
            }
        };
        getBooks();
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className="home-page">
            <div className="books-container">
                {books.map((book) => 
                <Book 
                id={book._id}
                bookCover={book.bookCover}
                title={book.title}
                author={book.author}
                isHomePage={true}
                />
                )}
            </div>
        </main>
    );
};

export default HomePage;
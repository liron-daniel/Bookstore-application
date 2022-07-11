import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import environments from "../../environments/environments.js";
import './admin-dashboard-page.styles.css';

import Modal from "../../components/modal/Modal.component.jsx";
import Book from "../../components/book/Book.component.jsx";
import Loader from "../../components/shared/loader/Loader.component.jsx";
import { AdminContext } from "../../contexts/Admin.context.jsx";
import { BookContext } from "../../contexts/Book.context.jsx";
import { initBookAction } from "../../actions/book.action.js";

const API_URL = environments.REACT_APP_API_URL;

const AdminDashboardPage = () => {
    const [isNewBook, setIsNewBook] = useState(true);
    const navigate = useNavigate();
    const adminContextValue = useContext(AdminContext);
    
    const bookContextValue = useContext(BookContext);

    const [bookID, setBookID] = useState('');
    const [bookData, setBookData] = useState({});

    const [modal, setModal] = useState('');

    const [show, setShow] = useState(false);
    
    const hideModal = () => {
        setModal('');
        setShow(false);
        setIsNewBook(true);
        setBookID('');
    };

    const handleBtn = () => {
        setModal('show');
        setShow(true);
        setIsNewBook(true);
    };

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch(`${API_URL}/books`);

                if (!response.ok) throw new Error();

                const responseObj = await response.json();
                const books = responseObj.data.books;
                
                const action = initBookAction(books);
                bookContextValue.dispatchBookState(action);

                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            } catch (err) {
                console.log(err);
                alert('Something went wrong!');
            }
        };

        !adminContextValue.adminToken ? navigate('/admin') : navigate('/admin/dashboard');

        getBooks();
    }, []);

    const handleBookClick = (book) => {
        setBookID(book._id);
        setModal('show');
        setShow(true);
        setIsNewBook(false);
        setBookData({
            title: book.title,
            author: book.author,
            bookCover: book.bookCover,
            description: book.description,
            pages: book.pages,
            price: book.price
        });
    };

    return isLoading ? (
        <Loader/>
    ) : (
        <main className="admin-dashboard-page">
            <button type="button" className="add-book-btn" onClick={handleBtn}>Add New Book</button>

            <div className="border-line"></div>

            <div className="books-container">
                {bookContextValue.bookState.books.map((book) => (
                <Book 
                id={book._id}
                bookCover={book.bookCover}
                title={book.title}
                author={book.author}
                isHomePage={false}
                handleBookClick={() => handleBookClick(book)}
                />
                ))}
            </div>

            {show && <Modal className={modal} hideModal={hideModal} isNewBook={isNewBook} bookID={bookID} bookData={bookData} />}
        </main>
    );
};

export default AdminDashboardPage;
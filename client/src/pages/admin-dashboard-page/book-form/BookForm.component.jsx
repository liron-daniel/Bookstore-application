import React, {useReducer, useContext} from "react";
import { useNavigate } from "react-router-dom";
import environments from "../../../environments/environments.js";
import './book-form.styles.css';

import FormInputContainer from "../../../components/form/form-input-container/FormInputContainer.component.jsx";
import bookFormReducer, {BOOK_FORM_INITIAL_STATE} from "../../../reducers/book-form.reducer.js";
import {updateTitleAction, updateAuthorAction, updateBookCoverAction, updateDescriptionAction, updatePagesAction, updatePriceAction} from "../../../actions/book-form.action.js";
import { AdminContext } from "../../../contexts/Admin.context.jsx";
import { BookContext } from "../../../contexts/Book.context.jsx";
import { addNewBookAction, updateBookAction, deleteBookAction } from "../../../actions/book.action.js";

const API_URL = environments.REACT_APP_API_URL;

const BookForm = (props) => {
    const adminContextValue = useContext(AdminContext);
    const token = adminContextValue.adminToken;

    const bookContextValue = useContext(BookContext);

    const bookID = props.bookID;
    const bookData = props.bookData;

    const [bookFormState, dispatchBookFormState] = useReducer(bookFormReducer, BOOK_FORM_INITIAL_STATE);

    const handleTitleInput = (event) => {
        const titleInput = event.target.value.trim();

        if (!bookID && titleInput === '') {
            dispatchBookFormState(updateTitleAction(titleInput, false, 'Please enter a book title'));
            return;
        }

        if (typeof titleInput !== 'string') {
            dispatchBookFormState(updateTitleAction(titleInput, false, 'Please enter a valid book title'));
            return;
        }

        dispatchBookFormState(updateTitleAction(titleInput, true, ''));

    };
    const handleAuthorInput = (event) => {
        const authorInput = event.target.value.trim();

        if (!bookID && authorInput === '') {
            dispatchBookFormState(updateAuthorAction(authorInput, false, 'Please enter a book author name'));
            return;
        }

        if (typeof authorInput !== 'string') {
            dispatchBookFormState(updateAuthorAction(authorInput, false, 'Please enter a valid book author name'));
            return;
        }

        dispatchBookFormState(updateAuthorAction(authorInput, true, ''));
    };
    const handleBookCoverInput = (event) => {
        const bookCoverInput = event.target.value.trim();

        if (!bookID && bookCoverInput === '') {
            dispatchBookFormState(updateBookCoverAction(bookCoverInput, false, 'Please enter a book cover url'));
            return;
        }

        if (typeof bookCoverInput !== 'string') {
            dispatchBookFormState(updateBookCoverAction(bookCoverInput, false, 'Please enter a valid book cover url'));
            return;
        }

        dispatchBookFormState(updateBookCoverAction(bookCoverInput, true, ''));
    };
    const handleDescriptionInput = (event) => {
        const descriptionInput = event.target.value.trim();

        if (!bookID && descriptionInput === '') {
            dispatchBookFormState(updateDescriptionAction(descriptionInput, false, 'Please enter a book description'));
            return;
        }

        if (typeof descriptionInput !== 'string') {
            dispatchBookFormState(updateDescriptionAction(descriptionInput, false, 'Please enter a valid book description'));
            return;
        }

        dispatchBookFormState(updateDescriptionAction(descriptionInput, true, ''));
    };
    const handlePagesInput = (event) => {
        const pagesInput = event.target.value.trim();

        if (!bookID && pagesInput === '') {
            dispatchBookFormState(updatePagesAction(pagesInput, false, 'Please enter a book pages number'));
            return;
        }

        if (typeof Number(pagesInput) !== 'number') {
            dispatchBookFormState(updatePagesAction(pagesInput, false, 'Please enter a valid book pages number'));
            return;
        }

        dispatchBookFormState(updatePagesAction(pagesInput, true, ''));
    };
    const handlePriceInput = (event) => {
        const priceInput = event.target.value.trim();

        if (!bookID && priceInput === '') {
            dispatchBookFormState((updatePriceAction(priceInput, false, 'Please enter a book price')));
            return;
        }

        if (typeof Number(priceInput) !== 'number') {
            dispatchBookFormState((updatePriceAction(priceInput, false, 'Please enter a valid book price')));
            return;
        }

        dispatchBookFormState(updatePriceAction(priceInput, true, ''));
    };

    const handleNewBookSubmit = async () => {
        const values = bookFormState.values;
        const validities = bookFormState.validities;

        if (values.title === '' || !validities.title ||
            values.author === '' || !validities.author ||
            values.bookCover === '' || !validities.bookCover ||
            values.description === '' || !validities.description ||
            values.pages === '' || !validities.pages ||
            values.price === '' || !validities.price) {
            return;
        }

        const bookValues = bookFormState.values;
        const data = {
            title: bookValues.title,
            author: bookValues.author,
            bookCover: bookValues.bookCover,
            description: bookValues.description,
            pages: bookValues.pages,
            price: bookValues.price
        };

        try {
            const response = await fetch(`${API_URL}/books/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.status !== 201) throw new Error();

            const responseObj = await response.json();
            const message = responseObj.message;
            alert(message);

            const book = responseObj.data.book;
            
            const action = addNewBookAction(book);
            bookContextValue.dispatchBookState(action);
            
            props.hideModal();
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    const handleUpdateSubmit = async () => {
        const values = bookFormState.values;
        const validities = bookFormState.validities;

        if ((values.title === '' || !validities.title) &&
            (values.author === '' || !validities.author) &&
            (values.bookCover === '' || !validities.bookCover) &&
            (values.description === '' || !validities.description) &&
            (values.pages === '' || !validities.pages) &&
            (values.price === '' || !validities.price)) {
            return;
        }

        const bookValues = bookFormState.values;

        const data = {
            title: bookValues.title ? bookValues.title : undefined,
            author: bookValues.author ? bookValues.author : undefined,
            bookCover: bookValues.bookCover ? bookValues.bookCover : undefined,
            description: bookValues.description ? bookValues.description : undefined,
            pages: bookValues.pages ? bookValues.pages : undefined,
            price: bookValues.price ? bookValues.price : undefined
        };

        try {
            const response = await fetch(`${API_URL}/books/${bookID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.status !== 202) throw new Error();

            const responseObj = await response.json();
            const message = responseObj.message;
            alert(message);

            const book = responseObj.data.book;

            const action = updateBookAction(book);
            bookContextValue.dispatchBookState(action);

            props.hideModal();
        } catch (err) {
            alert('Something went wrong!');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/books/${bookID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error();

            const responseObj = await response.json();
            const message = responseObj.message;
            alert(message);

            const action = deleteBookAction(bookID);
            bookContextValue.dispatchBookState(action);

            props.hideModal();
        } catch (err) {
            console.log(err);
            alert('Something went wrong!');
        }
    };

    return (
        <form className="book-form">
            <FormInputContainer id="book-form-title" labelText="Title:" type="text" required={true} handleInput={handleTitleInput} placeholder={bookID ? bookData.title : null} isValid={bookFormState.validities.title} errorMessage={bookFormState.errorMessages.title}/>

            <FormInputContainer id="book-form-author" labelText="Author:" type="text" required={true} handleInput={handleAuthorInput} placeholder={bookID ? bookData.author : null} isValid={bookFormState.validities.author} errorMessage={bookFormState.errorMessages.author}/>

            <FormInputContainer id="book-form-book-cover" labelText="Book Cover:" type="url" required={true} handleInput={handleBookCoverInput} placeholder={bookID ? bookData.bookCover : null} isValid={bookFormState.validities.bookCover} errorMessage={bookFormState.errorMessages.bookCover}/>

            <FormInputContainer id="book-form-description" labelText="Description:" type="text" required={true} handleInput={handleDescriptionInput} placeholder={bookID ? bookData.description : null} isValid={bookFormState.validities.description} errorMessage={bookFormState.errorMessages.description}/>

            <FormInputContainer id="book-form-pages" labelText="Pages:" type="number" required={true} handleInput={handlePagesInput} placeholder={bookID ? bookData.pages : null} isValid={bookFormState.validities.pages} errorMessage={bookFormState.errorMessages.pages}/>

            <FormInputContainer id="book-form-price" labelText="Price:" type="number" required={true} handleInput={handlePriceInput} placeholder={bookID ? bookData.price : null} isValid={bookFormState.validities.price} errorMessage={bookFormState.errorMessages.price}/>

            {bookID ? (
                <div className="btn-container">
                    <button type="button" id="update-book-submit-btn" onClick={handleUpdateSubmit}>Save Update</button>

                    <button type="button" id="delete-book-btn" onClick={handleDelete}>Delete Book</button>
                </div>) : (
                    <button type="button" id="book-form-submit-btn" onClick={handleNewBookSubmit}>Save</button>
                )}
            
        </form>
    );
};

export default BookForm;
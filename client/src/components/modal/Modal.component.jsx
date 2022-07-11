import React from "react";
import './modal.styles.css';

import BookForm from "../../pages/admin-dashboard-page/book-form/BookForm.component.jsx";

const Modal = (props) => {
    return (
        <div className={`modal-background ${props.className}`}>
            <div className="modal-container">
                <button type="button" className="close-modal-btn" onClick={props.hideModal}>
                    X
                </button>

                <BookForm bookID={props.bookID} isNewBook={props.isNewBook} hideModal={props.hideModal} bookData={props.bookData}/>
            </div>
        </div>
    );
};

export default Modal;
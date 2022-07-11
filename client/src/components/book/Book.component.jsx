import { useNavigate } from 'react-router-dom';
import './book.styles.css';

const Book = (props) => {
    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate(`books/${props.id}`);
    };

    return (
        <div className="book-container" onClick={props.isHomePage ? handleBookClick : props.handleBookClick}>
            <img className="book-cover" src={props.bookCover} alt={props.title}/>

            <div className="book-info-container">
                <h2 className="book-title">{props.title}</h2>

                <h3 className="book-author">{props.author}</h3>
            </div>
        </div>
    );
};

export default Book;
import React from 'react';
import defaultThumbnailImage from '../assets/404_img.jpg';

const Book = (props) => {
    const { books, updateShelfBook } = props;

    const getThumbnailImg = (book) => {
        if(book.imageLinks && book.imageLinks.smallThumbnail)
            return book.imageLinks.smallThumbnail;
        else if(book.imageLinks && book.imageLinks.thumbnail)
            return book.imageLinks.thumbnail;
        else return defaultThumbnailImage;
    }

    return (
        <ol className="books-grid">
            {books.length ?
                books.map(book => {
                    return (<li key={book.id}>
                        <div className="read">
                            <div className="book-top">
                                <div className="book-cover" style={{ backgroundImage: 'url(' +  getThumbnailImg(book) + ')' }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(e) => updateShelfBook(book, e.target.value)} defaultValue={ book.shelf }>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors && book.authors.length? book.authors.join("\n"): ""}</div>
                        </div>
                    </li>)
                })

                /* This is a message telling a user that
                   he do not have any book for this shelf.
                   This is not a required field. */

                : <h3>You do not have any book in this shelf!</h3>}
        </ol>

    )
}

export default Book;
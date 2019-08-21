import React from 'react';

const Book = (props) => {
    const { books, updateBookShelf } = props;

    return (
        <ol className="books-grid">
            {books.length ?
                books.map(book => {
                    return (<li key={book.id}>
                        <div className="read">
                            <div className="book-top">
                                <div className="book-cover" style={{ backgroundImage: 'url(' + book.imageLinks.smallThumbnail || book.imageLinks.thumbnail || null + ')' }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(e) => updateBookShelf(book, e.target.value)}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>)
                })
                : <h3>You do not have any book in this shelf!</h3>}
        </ol>

    )
}

export default Book;
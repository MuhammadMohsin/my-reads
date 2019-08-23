import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BookShelves extends Component {

    filterBooks = (books, shelf) => {
        return books.filter(book => book.shelf === shelf);
    }

    componentDidMount() {
        this.props.getAllBooks();
    }

    render() {
        const { updateShelfBook, shelfBooks } = this.props;
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        {shelfBooks.length ? <Book
                                            books={this.filterBooks(shelfBooks, "currentlyReading")}
                                            updateShelfBook={updateShelfBook}
                                        /> : null}
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        {shelfBooks.length ? <Book
                                            books={this.filterBooks(shelfBooks, "wantToRead")}
                                            updateShelfBook={updateShelfBook}
                                        /> : null}
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        {shelfBooks.length ? <Book
                                            books={this.filterBooks(shelfBooks, "read")}
                                            updateShelfBook={updateShelfBook}
                                        /> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link
                                className="link-btn"
                                to="/search">
                                Add a book
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelves;
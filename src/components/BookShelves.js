import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksService from '../services/BooksAPI';

class BookShelves extends Component {

    state = {
        books: [],
        loadingState: false
    }

    getAllBooks = async () => {
        this.processLoader(true);
        const books = await BooksService.getAll();
        this.setState({ loadingState: false, books });
    }

    filterBooks = (shelf) => {
        return this.state.books.filter(book => book.shelf === shelf);
    }

    updateBookShelf = async (updatedBook, newShelfName) => {
        const book = this.state.books.find(bookObj => bookObj.id === updatedBook.id);

        /* Check whether user is updating already placed shelf */
        if (book.shelf !== newShelfName) {
            this.processLoader(true);
            await BooksService.update(updatedBook, newShelfName);
            this.getAllBooks();
        }
    }

    processLoader = (state) => {
        this.setState({ loadingState: state })
    }

    componentDidMount() {
        this.getAllBooks();
    }

    render() {
        const { loadingState } = this.state;
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    {loadingState ? <h2>Loading..</h2> :
                        <div>
                            <div className="list-books-content">
                                <div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Currently Reading</h2>
                                        <div className="bookshelf-books">
                                            <Book
                                                books={this.filterBooks("currentlyReading")}
                                                updateBookShelf={this.updateBookShelf}
                                            />
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Want to Read</h2>
                                        <div className="bookshelf-books">
                                            <Book
                                                books={this.filterBooks("wantToRead")}
                                                updateBookShelf={this.updateBookShelf}
                                            />
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Read</h2>
                                        <div className="bookshelf-books">
                                            <Book
                                                books={this.filterBooks("read")}
                                                updateBookShelf={this.updateBookShelf}
                                            />
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
                    }
                </div>
            </div>
        )
    }
}

export default BookShelves;
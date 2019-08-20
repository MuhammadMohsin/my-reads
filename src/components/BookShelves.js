import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksService from '../services/BooksAPI';

class BookShelves extends Component {

    state = {
        books: [],
        loadingState: false
    }

    async componentDidMount() {
        this.setState({ loadingState: true });
        const books = await BooksService.getAll();
        this.setState({ loadingState: false, books });
    }

    filterBooks = (shelf) => {
        return this.state.books.filter(book => book.shelf === shelf);
    }

    render() {
        const { loadingState, books } = this.state;
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    {loadingState ? <h2>Loading..</h2> :
                        books.length &&
                        <div>
                            <div className="list-books-content">
                                <div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Currently Reading</h2>
                                        <div className="bookshelf-books">
                                            <Book books={this.filterBooks("currentlyReading")} />
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Want to Read</h2>
                                        <div className="bookshelf-books">
                                            <Book books={this.filterBooks("wantToRead")} />
                                        </div>
                                    </div>
                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Read</h2>
                                        <div className="bookshelf-books">
                                            <Book books={this.filterBooks("read")} />
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksService from '../services/BooksAPI';

class Search extends Component {

    state = {
        books: [],
        query: "",
        loadingState: false,
        searchError: null
    }

    handleSearch = async (e) => {
        e.preventDefault();
        const { query } = this.state;
        if (query) {
            this.setState({ loadingState: true });
            const books = await BooksService.search(query);
            if (books && books.length) {
                this.setState({ books, loadingState: false, searchError: "" });
            }
            else this.setState({ book: [], searchError: "Search not found!", loadingState: false });
        }
    }

    updateBookShelf = async (updatedBook, newShelfName) => {
        await BooksService.update(updatedBook, newShelfName);
    }

    render() {
        const { books, searchError, loadingState } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"
                        className="close-search">
                        Close
                    </Link>
                    <form onSubmit={this.handleSearch} className="search-books-form">
                        <div className="search-books-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={(e) => this.setState({ query: e.target.value.trim() })}
                            />
                        </div>
                    </form>
                </div>
                {loadingState ? <h2 className="search-result-text">Loading..</h2> :
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {searchError ?
                                <h2> {searchError} </h2>
                                : books.length ?
                                    <Book
                                        books={this.state.books}
                                        updateBookShelf={this.updateBookShelf}
                                    /> : null
                            }
                        </ol>
                    </div>
                }
            </div>
        )
    }
}

export default Search;
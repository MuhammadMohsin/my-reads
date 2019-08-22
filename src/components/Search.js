import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksService from '../services/BooksAPI';

class Search extends Component {

    state = {
        books: [],
        currentQuery: "",
        loadingState: false,
        searchError: null
    }

    handleSearch = async (e) => {
        e.preventDefault();
        const { currentQuery } = this.state;
        const query = e.target.value.trim();
        if (query && query !== currentQuery) {
            this.setState({ loadingState: true });
            try {
                this.setState({ currentQuery: query });
                const books = await BooksService.search(query);
                if (books && books.length) {
                    this.setState({ books, loadingState: false, searchError: "" });
                }
                else this.setState({ books: [], searchError: "Search not found!", loadingState: false });
            } catch (error) {
                console.log(error);
                this.setState({ loadingState: false });
            }
        }
        if (!query) {
            this.setState({ books: [] });
        }
    }

    updateBookShelf = async (updatedBook, newShelfName, index) => {
        try {
            await BooksService.update(updatedBook, newShelfName);
            this.setState((currentState) => {
                const updatedBooks = currentState.books.map(book => {
                    if (book.id === updatedBook.id)
                        book.shelf = newShelfName
                    return book;
                })
                return { books: updatedBooks }
            })
        } catch (error) {
            console.log(error);
        }
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
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.handleSearch}
                        />
                    </div>
                </div>
                {loadingState ? <h2 className="search-result-text">Loading..</h2> :
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {searchError ?
                                <h2> {searchError} </h2>
                                : books.length ?
                                    <Book
                                        books={books}
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
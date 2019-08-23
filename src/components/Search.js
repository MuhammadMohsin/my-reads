import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

const Search = (props) => {

    const handleSearch = (e) => {
        const query = e.target.value;
        props.searchBook(query.trim());
    }
    const { searchedBooks, searchError, updateShelfBook } = props;
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
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchError ?
                        <h2> {searchError} </h2>
                        : searchedBooks.length ?
                            <Book
                                books={searchedBooks}
                                updateShelfBook={updateShelfBook}
                            /> : null
                    }
                </ol>
            </div>
        </div>
    )
}

export default Search;
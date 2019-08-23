import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import * as BooksService from '../services/BooksAPI';
import BookShelves from './BookShelves';
import Search from './Search';
import DefaultComponent from './404Page';
import './App.css';

class App extends Component {

  state = {
    shelfBooks: [],
    searchedBooks: [],
    currentQuery: "",
    searchError: null
  }

  getAllShelfBooks = async () => {
    try {
      const shelfBooks = await BooksService.getAll();
      this.setState({ shelfBooks });
    } catch (error) {
      console.log(error);
    }
  }

  updateShelfBook = async (updatedBook, newShelfName) => {
    const book = this.state.shelfBooks.find(bookObj => bookObj.id === updatedBook.id);

    /* Check whether user is updating already placed shelf */
    if (book.shelf !== newShelfName) {
      try {
        await BooksService.update(updatedBook, newShelfName);
        this.getAllShelfBooks();
      } catch (error) {
        console.log(error);
      }
    }
  }

  searchBook = async (query) => {
    const { currentQuery } = this.state;
    if (query && query !== currentQuery) {
      try {

        // In case user directly jump on search screen from browser url
        if(!this.state.shelfBooks.length){
          await this.getAllShelfBooks();
        }

        const books = await BooksService.search(query);
        if (books && books.length) {
          const updatedBooks = books.map(book => {

            // Update shelf if book is already in user's shelf
            const alreadyInShelfBook = this.state.shelfBooks.find(shelfBook => shelfBook.id === book.id );
            if(alreadyInShelfBook && alreadyInShelfBook.shelf){
              book.shelf = alreadyInShelfBook.shelf;
            }
            // Assign "none" to default shelf
            else book.shelf = "none";
            return book;
          })
          this.setState({ searchedBooks: updatedBooks, currentQuery: query, searchError: "" });
        }
        else this.setState({ searchedBooks: [], searchError: "Search not found!" });
      } catch (error) {
        console.log(error);
      }
    }
    if (!query) {
      this.setState({ searchedBooks: [] });
    }
  }

  updateSearchedBookShelf = async (updatedBook, newShelfName) => {
    try {
      await BooksService.update(updatedBook, newShelfName);
      this.setState((currentState) => {
        const updatedBooks = currentState.searchedBooks.map(book => {
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
    const { shelfBooks, searchedBooks, searchError } = this.state;

    return (
      <Switch>
        <Route exact path="/" render={() =>
          <BookShelves
            updateShelfBook={this.updateShelfBook}
            shelfBooks={shelfBooks}
            getAllBooks={this.getAllShelfBooks} />}
        />
        <Route path="/search" render={() =>
          <Search
            searchedBooks={searchedBooks}
            updateShelfBook={this.updateSearchedBookShelf}
            searchBook={this.searchBook}
            searchError={searchError} />}
        />
        <Route component={DefaultComponent} />
      </Switch>
    )
  }
}

export default App;

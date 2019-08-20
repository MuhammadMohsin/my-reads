import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import BookShelves from './components/BookShelves';
import Search from './components/Search';

function App() {
  return (
    <div>
      <Route exact path="/" component={BookShelves} />
      <Route path="/search" component={Search} />
    </div>
  );
}

export default App;

import React from 'react';
import { Route } from 'react-router-dom'
import BookShelves from './BookShelves';
import Search from './Search';
import './App.css';

function App() {
  return (
    <div>
      <Route exact path="/" component={BookShelves} />
      <Route path="/search" component={Search} />
    </div>
  );
}

export default App;

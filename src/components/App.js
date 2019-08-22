import React from 'react';
import { Route, Switch } from 'react-router-dom'
import BookShelves from './BookShelves';
import Search from './Search';
import DefaultComponent from './404Page';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={BookShelves} />
      <Route path="/search" component={Search} />
      <Route component={DefaultComponent}/>
    </Switch>
  );
}

export default App;

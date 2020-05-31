import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import SearchForm from './components/searchContainer';
import ResultComponent from './components/result';
import { API_URL } from './constants';
 
import './App.css';

function App() {
  const link = API_URL;
  return (
    <div className="App">
        <Header />
        <BrowserRouter>
          <Route exact path="/" component={SearchForm} />
          <Route exact path="/find" component={ResultComponent} />
        </BrowserRouter>
        <Footer link={link} />
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './store'

import './assets/css/style.css';

import Home from './pages/Home/home';
import Users from './pages/Users/users';
import Error from './pages/Error/error';

import Header from './components/Header/header'
import Footer from './components/Footer/footer'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <Header />
        <Routes>
          <Route exact path="/"  element={<Home />} />
          <Route exact path="/users" element={<Users />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'




import Home from '../pages/Home/home';
import Employees from '../pages/Employees/employees';
import Error from '../pages/Error/error';

import Header from '../components/Header/header'
import Footer from '../components/Footer/footer'

import Login from '../pages/Signin/signin';

function MainLayoutRoutes() {
    return (
        <React.Fragment >
           
          
                <Header />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/addemployee"  element={<Home />} />
                    <Route exact path="/employees" element={<Employees />} />
                    <Route path='*' element={<Error />} />
                </Routes>
                <Footer />
          
            
        </React.Fragment>
  )
}

export default MainLayoutRoutes;
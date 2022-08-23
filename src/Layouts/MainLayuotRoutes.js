import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AddEmployee from '../pages/addemployee';
import Employees from '../pages/employees';
import Error from '../pages/error';
import Login from '../pages/signin';

import Header from '../components/header'
import Footer from '../components/footer'

function MainLayoutRoutes() {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/addemployee"  element={<AddEmployee />} />
                <Route exact path="/editeemployee/:id"  element={<AddEmployee />} />
                <Route exact path="/employees" element={<Employees />} />
                <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
        </>
  )
}

export default MainLayoutRoutes;
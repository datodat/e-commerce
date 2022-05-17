import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Css
import './App.css';
// Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Products from './components/products/Products';
import Profile from './components/profile/Profile';
import Signin from './components/signin/Signin';
// Services
import phoneService from './services/phone';
// import userService from './services/user';
// import loginService from './services/login';

const App = () => {
  // User
  const [user, setUser] = useState(null);
  // Phones
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    phoneService
      .getAll()
        .then(res => setPhones(res))
        .catch(error => console.log(error.message))
  }, [])

  return (
    <Router>
      <div className='container'>
        <Header user={user} />

        <Routes>
          <Route path='/sign-in' element={!user ? <Signin /> : <Navigate replace to='/' />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate replace to='/sign-in' />} />
          <Route path='/products' element={<Products phones={phones} />} />
          <Route path='/' element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
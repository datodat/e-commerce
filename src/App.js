import React, { useState } from 'react';
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

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className='container'>
        <Header user={user} />

        <Routes>
          <Route path='/signin' element={!user ? <Signin /> : <Navigate replace to='/' />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate replace to='/signin' />} />
          <Route path='/products' element={<Products />} />
          <Route path='/' element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
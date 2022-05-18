import React, { useState, useEffect, useRef } from 'react';
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
import userService from './services/user';
import loginService from './services/login';

const App = () => {
  // User
  const [user, setUser] = useState(null);
  // Phones
  const [phones, setPhones] = useState([]);
  // Go top
  const [goTop, setGoTop] = useState(false);

  const refForSignin = useRef();

  window.addEventListener('scroll', () => {
    if(window.scrollY > 400){
      setGoTop(true);
    }else{
      setGoTop(false);
    }
  })

  useEffect(() => {
    phoneService
      .getAll()
        .then(res => setPhones(res))
        .catch(error => console.log(error.message))
  }, [])

  useEffect(() => {
    const storageUser = window.localStorage.getItem('user');
    if(storageUser){
      setUser(JSON.parse(storageUser));
    }
  }, [])

  const handleLogin = obj => {
    loginService
      .login(obj)
        .then(res => {
          setUser(res);
          window.localStorage.removeItem('user');
          window.localStorage.setItem('user', JSON.stringify(res))
        })
        .catch(() => refForSignin.current.handleError('Incorrect username or password'))
  }

  const handleSignup = obj => {
    userService
      .createUser(obj)
        .then(() => refForSignin.current.handleSuccess('Registered successfully, please log in'))
        .catch(() => refForSignin.current.handleError('Username already exists'))
  }

  const logOut = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <Router>
      <button 
        onClick={goToTop} 
        style={{ display: goTop ? 'inline' : 'none' }} 
        className='go-top-btn'
      >
        <i className="fa-solid fa-arrow-up-long"></i>
      </button>
      <div className='container'>
        <Header 
          user={user}
          logOut={logOut} 
        />

        <Routes>
          <Route path='/sign-in' element={!user ? 
            <Signin 
              ref={refForSignin}
              loginHandler={handleLogin}
              signupHandler={handleSignup} 
            /> : 
            <Navigate replace to='/' />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate replace to='/sign-in' />} />
          <Route path='/products' element={<Products phones={phones} user={user} />} />
          <Route path='/' element={<Home phones={phones} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
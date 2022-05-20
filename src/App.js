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
  // All Users
  const [allUsers, setAllUsers] = useState([]);
  // Phones
  const [phones, setPhones] = useState([]);
  // Go top
  const [goTop, setGoTop] = useState(false);

  const refForSignin = useRef();

  // Scroll listener
  window.addEventListener('scroll', () => {
    if(window.scrollY > 400){
      setGoTop(true);
    }else{
      setGoTop(false);
    }
  })

  // Get all phones on first render
  useEffect(() => {
    phoneService
      .getAll()
        .then(res => setPhones(res))
        .catch(error => console.log(error.message))
  }, [])

  // Get all users
  useEffect(() => {
    userService
      .allUsers()
        .then(res => setAllUsers(res))
        .catch(error => console.log(error.message))
  }, [])

  // Check local storage user
  useEffect(() => {
    const storageUser = window.localStorage.getItem('user');
    if(storageUser){
      setUser(JSON.parse(storageUser));
    }
  }, [])

  // Log-in handler
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

  // Sign-up handler
  const handleSignup = obj => {
    userService
      .createUser(obj)
        .then(() => refForSignin.current.handleSuccess('Registered successfully, please log in'))
        .catch(() => refForSignin.current.handleError('Username already exists'))
  }

  // Log out handler
  const logOut = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  // Go top after scroll
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Add Phone
  const handlePhoneAdding = obj => {
    phoneService
      .addPhone(obj)
        .then(res => setPhones(phones.concat(res)))
        .catch(error => console.log(error.message))
  }

  // Update Phone
  const updatePhone = (id, obj) => {
    phoneService
      .updatePhone(id, obj)
        .then(res => setPhones(phones.map(i => i.id === res.id ? res : i)))
        .catch(error => console.log(error.message))
  }

  // Delete Phone
  const deletePhone = id => {
    phoneService
      .deletePhone(id)
        .then(() => setPhones(phones.filter(i => i.id !== id)))
        .catch(error => console.log(error.message))
  }

  // Update User
  const updateUser = id => {
    userService
      .updateUser(id)
        .then(res => setAllUsers(allUsers.map(i => i.id === res.id ? res : i)))
        .catch(error => console.log(error.message))
  }

  // Delete User
  const deleteUser = id => {
    userService
      .deleteUser(id)
        .then(() => setAllUsers(allUsers.filter(i => i.id !== id)))
        .catch(error => console.log(error.message))
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
          <Route path='/profile' element={user ? <Profile 
            user={user} 
            allUsers={allUsers}
            phones={phones} 
            addPhoneHandler={handlePhoneAdding}
            deleteUser={deleteUser}
            updateUser={updateUser}
            deletePhone={deletePhone}
            updatePhone={updatePhone}
          /> : <Navigate replace to='/sign-in' />} />
          <Route path='/products' element={<Products phones={phones} user={user} />} />
          <Route path='/' element={<Home phones={phones} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
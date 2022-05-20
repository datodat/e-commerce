import { useState, forwardRef, useImperativeHandle } from 'react';
// Css
import './signin.css';
// Validators
import { usernameValidator, nameValidator, passwordValidator } from './validators';

const Signin = forwardRef (({ loginHandler, signupHandler }, ref) => {
  const [showLogin, setShowLogin] = useState(false);
  // Input values
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // Errors
  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // Notifications
  const [notification, setNotification] = useState('');
  const [notificationClass, setNotificationClass] = useState('');

  useImperativeHandle(ref, () => {
    return {
      handleSuccess,
      handleError
    }
  })

  const handleSuccess = text => {
    setNotification(text);
    setNotificationClass('success-notification')
    setTimeout(() => {
      setNotification('');
      setNotificationClass('');
      setShowLogin(!showLogin);
    }, 3000)
  }
  const handleError = text => {
    setNotification(text);
    setNotificationClass('error-notification');
    setTimeout(() => {
      setNotification('');
      setNotificationClass('');
    }, 3000)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setUsernameError('');
    setNameError('');
    setPasswordError('');

    if(!usernameValidator(username)){
      setUsernameError('* Username must be at least 4 characters');
    }
    if(!passwordValidator(password)){
      setPasswordError('* Password must be at least 8 characters');
    }

    if(usernameValidator(username) &&
       passwordValidator(password)){
      
      const obj = {
        username,
        password
      }
      loginHandler(obj);
      setUsername('');
      setName('');
      setPassword('');
    }
  }

  const handleSignup = (e) => {
    e.preventDefault();
    setUsernameError('');
    setNameError('');
    setPasswordError('');

    if(!usernameValidator(username)){
      setUsernameError('* Username must be at least 4 characters');
    }
    if(!nameValidator(name)){
      setNameError('* Name must be at least 2 characters');
    }
    if(!passwordValidator(password)){
      setPasswordError('* Password must be at least 8 characters');
    }

    if(usernameValidator(username) &&
       nameValidator(name) &&
       passwordValidator(password)){
      
      const obj = {
        username,
        name,
        password
      }
      signupHandler(obj);
      setUsername('');
      setName('');
      setPassword('');
    }
  }

  const changeForm = () => {
    setShowLogin(!showLogin);
    setUsername('');
    setName('');
    setPassword('');
    setUsernameError('');
    setNameError('');
    setPasswordError('');
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <p>log in</p>
        {notification && <p className={notificationClass}>{notification}</p>}
        {/* Username */}
        <div>
          <input 
            style={{ borderColor: usernameError ? '#f30100' : '#999999' }}
            type='text' 
            placeholder='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            maxLength="40"
          />
          <i style={{ display: usernameError ? '' : 'none' }} className="fa-solid fa-circle-exclamation"></i>
          {usernameError && <p className='error-p'>{usernameError}</p>}
        </div>
        {/* Password */}
        <div>
          <input 
            style={{ borderColor: passwordError ? '#f30100' : '#999999' }}
            type='password' 
            placeholder='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            maxLength="40"
          />
          <i style={{ display: passwordError ? '' : 'none' }} className="fa-solid fa-circle-exclamation"></i>
          {passwordError && <p className='error-p'>{passwordError}</p>}
        </div>
        <button 
          key={1}
          className='submit-btn'
          type='submit'
          onClick={handleLogin}
        >
          Log in
        </button>
        <button
          key={2}
          type='button'
          className='change-form-btn'
          onClick={changeForm}
        >
          Don't have account? sign up
        </button>
      </form>
    );
  }

  const signupForm = () => {
    return (
      <form onSubmit={handleSignup}>
        <p>sign up</p>
        {notification && <p className={notificationClass}>{notification}</p>}
        {/* Username */}
        <div>
          <input 
            style={{ borderColor: usernameError ? '#f30100' : '#999999' }}
            type='text' 
            placeholder='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            maxLength="40"
          />
          <i style={{ display: usernameError ? '' : 'none' }} className="fa-solid fa-circle-exclamation"></i>
          {usernameError && <p className='error-p'>{usernameError}</p>}
        </div>
        {/* Name */}
        <div>
          <input 
            style={{ borderColor: nameError ? '#f30100' : '#999999' }}
            type='text' 
            placeholder='Name'
            value={name}
            onChange={({ target }) => setName(target.value)}
            maxLength="40"
          />
          <i style={{ display: nameError ? '' : 'none' }} className="fa-solid fa-circle-exclamation"></i>
          {nameError && <p className='error-p'>{nameError}</p>}
        </div>
        {/* Password */}
        <div>
          <input 
            style={{ borderColor: passwordError ? '#f30100' : '#999999' }}
            type='password' 
            placeholder='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            maxLength="40"
          />
          <i style={{ display: passwordError ? '' : 'none' }} className="fa-solid fa-circle-exclamation"></i>
          {passwordError && <p className='error-p'>{passwordError}</p>}
        </div>
        <button
          key={1}
          className='submit-btn' 
          type='submit'
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <button 
          key={2}
          type='button'
          className='change-form-btn'
          onClick={changeForm}
        >
          Already member? log in
        </button>
      </form>
    );
  }

  return (
    <div className='sign-in'>
      {showLogin ? loginForm() : signupForm()}
    </div>
  );
});

export default Signin;
import { useState } from 'react';
import { Link } from 'react-router-dom';
// Css
import './header.css';

const Header = ({ user, logOut }) => {
  const [navVisible, setNavVisible] = useState(false);

  window.addEventListener('resize', () => {
    if(window.innerWidth > 600) {
      setNavVisible(false);
    }
  })

  const logOutHandler = () => {
    setNavVisible(false);
    logOut();
  }

  return (
    <header>
      <div>
        smartphones
      </div>
      {/* Navbar */}
      <nav
        style={{ display: navVisible ? 'flex' : 'none' }}
      >
        <Link onClick={() => setNavVisible(false)} to='/'>home</Link>
        <Link onClick={() => setNavVisible(false)} to='/products'>products</Link>
        {!user && 
          <Link className='sign-in-link' onClick={() => setNavVisible(false)} to='/sign-in'>
            sign in
            <i className="fa-solid fa-right-to-bracket"></i>
          </Link>}
        {user && 
          <Link className='profile-link' onClick={() => setNavVisible(false)} to='/profile'>
            my profile
            <i className="fa-solid fa-user"></i>  
          </Link>}
        {user && 
          <Link className='log-out-link' onClick={logOutHandler} to='/'>
            log out
            <i className="fa-solid fa-right-from-bracket"></i>
          </Link>}
      </nav>
      {/* Responsive nav menu */}
      <div 
        className={navVisible ? 'resp-nav-clicked' : 'resp-nav'}
        onClick={() => setNavVisible(!navVisible)}  
      >
        <div className='menu1'></div>
        <div className='menu2'></div>
        <div className='menu3'></div>
      </div>
    </header>
  );
}

export default Header;
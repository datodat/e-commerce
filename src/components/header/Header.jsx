import { useState } from 'react';
import { Link } from 'react-router-dom';
// Css
import './header.css';

const Header = ({ user }) => {
  const [navVisible, setNavVisible] = useState(false);

  window.addEventListener('resize', () => {
    if(window.innerWidth > 600) {
      setNavVisible(false);
    }
  })

  return (
    <header>
      <div>
        online shop
      </div>
      {/* Navbar */}
      <nav
        style={{ display: navVisible ? 'flex' : 'none' }}
      >
        <Link onClick={() => setNavVisible(false)} to='/'>home</Link>
        <Link onClick={() => setNavVisible(false)} to='/products'>products</Link>
        {!user && <Link onClick={() => setNavVisible(false)} to='/signin'>sign in</Link>}
        {user && <Link onClick={() => setNavVisible(false)} to='/profile'>my profile</Link>}
        {user && <Link onClick={() => setNavVisible(false)} to='/'>log out</Link>}
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
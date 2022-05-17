import React from 'react';
import { Link } from 'react-router-dom'; 
import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-top">
        <div className='ext-links-div'>
          <a href='https://github.com/datodat' target='_blank' rel='noopener noreferrer'>
            <i className="fa-brands fa-github-square"></i>
            GitHub
          </a>
          <a href='https://www.linkedin.com/in/dato-kevlishvili-8365131b9/' target='_blank' rel='noopener noreferrer'>
            <i className="fa-brands fa-linkedin"></i>
            Linkedin
          </a>
          <a href='https://www.facebook.com/dato.kevlishvili.12/' target='_blank' rel='noopener noreferrer'>
            <i className="fa-brands fa-facebook-square"></i>
            Facebook
          </a>
          <a href='mailto:dato.kevlishvili.1990@gmail.com' target='_blank' rel='noopener noreferrer'>
            <i className="fa-solid fa-envelope"></i>
            Email
          </a>
          <a href='tel:598110706' target='_blank' rel='noopener noreferrer'>
            <i className="fa-solid fa-square-phone"></i>
            Phone Number
          </a>
        </div>
        <div className='int-links-div'>
          <Link to='/products'>See All Products</Link>
          <Link to='/sign-in'>Sign in</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Created By Dato Kevlishvili</p>
        <p>&copy; Copyright 2022, All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
import { useState } from 'react';
import './card.css';

const Card = ({ phone }) => {
  const [showUsd, setShowUsd] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const toUSD = Math.floor(phone.price / 2.65);

  return (
    <div className='card'>
      <div style={{ display: showInfo ? 'flex' : 'none' }} className='info-div'>
        <p>{phone.processor}</p>
        <p>{phone.camera}</p>
        <p>{phone.battery}</p>
      </div>
      <div style={{ display: showInfo ? 'none' : 'block' }} className='card-img'>
        <img src={phone.img} alt='phone' />
      </div>
      <div className='card-info'>
        <p className='card-name'>{phone.name}</p>
        <p
          className='currency-changer'
          onClick={() => setShowUsd(!showUsd)}
        >
          {showUsd ?
            toUSD :
            phone.price
          }
          {showUsd ?
            ' $' :
            ' ₾'}
        </p>
        <button 
          className='show-info-btn'
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? 'Hide' : 'Info'}
          <i className="fa-solid fa-circle-info"></i>
        </button>
        <button className='add-cart-btn'>
          Add to cart
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
    </div>
  );
}

export default Card;
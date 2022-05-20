import { useState, useEffect } from 'react';
// Css
import './products.css';
// Card
import Card from '../card/Card';

const Products = ({ phones }) => {
  const [word, setWord] = useState('');
  const [phonesArray, setPhonesArray] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setPhonesArray(phones);
  }, [phones]);

  // Filter phones
  useEffect(() => {
    if(word !== ''){
      const filtered = phones.filter(i => i.name.toLowerCase().includes(word.toLowerCase()));
      setPhonesArray(filtered);
    }else{
      setPhonesArray(phones);
    }
  }, [word]); //eslint-disable-line

  const handleCart = (obj) => {
    const existingObj = cart.some(i => i.id === obj.id);

    if(existingObj){
      alert('This phone is already added to cart!');
    }else{
      setCart(cart.concat(obj));
    }
  }

  // Full Price calculator
  const fullPrice = () => {
    let price = 0;
    cart.forEach(i => price += i.price);
    return price;
  }

  // Remove phone
  const removePhone = id => {
    const filtered = cart.filter(i => i.id !== id);
    setCart(filtered);
  }

  return (
    <div className='products'>
      {/* Cart */}
      <div className='products-cart'>
        <i id='cart-logo' className="fa-solid fa-cart-shopping"></i>
        <p>Cart</p>
        <div className='cart-list-container'>
          {cart.length > 0 ? cart.map(i => {
            return (
              <div className='cart-list' key={i.id}>
                <p>{i.name}</p>
                <div>
                  <p>{i.price}</p>
                  <i onClick={() => removePhone(i.id)} className="fa-solid fa-trash"></i>
                </div>
              </div>
            )
          }) :
            <p className='no-items-p'>No Items</p>
          }
        </div>
        <p>Price: <span>{cart.length > 0 ? fullPrice() : 0}</span> ₾</p>
      </div>
      {/* Search */}
      <div className="search-div">
        <input 
          type='text' 
          placeholder='Search...' 
          value={word}
          onChange={({ target }) => setWord(target.value)}
        />
      </div>
      <hr />
      {/* All Phones */}
      <div className='products-div'>
        {phonesArray.length > 0 && phonesArray.map(i => {
          return <Card 
            key={i.id} 
            phone={i} 
            handleCart={handleCart} 
          />
        })}
      </div>
    </div>
  );
}

export default Products;
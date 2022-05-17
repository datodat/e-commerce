import { useState, useEffect } from 'react';
import './products.css';
import Card from '../card/Card';

const Products = ({ phones }) => {
  const [word, setWord] = useState('');
  const [phonesArray, setPhonesArray] = useState([]);

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

  return (
    <div className='products'>
      <div className="search-div">
        <input 
          type='text' 
          placeholder='Search...' 
          value={word}
          onChange={({ target }) => setWord(target.value)}
        />
      </div>
      <hr />
      <div className='products-div'>
        {phonesArray.length > 0 && phonesArray.map(i => {
          return <Card key={i.id} phone={i} />
        })}
      </div>
    </div>
  );
}

export default Products;
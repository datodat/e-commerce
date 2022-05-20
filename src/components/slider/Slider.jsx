import { useState } from 'react';
// Css
import './slider.css';
// Images array
const sliderPhotos = [
  './slider/slider1.jpg',
  './slider/slider2.jpg',
  './slider/slider3.jpg',
]

const Slider = () => {
  const [count, setCount] = useState(0);

  const nextImg = () => {
    if(count === sliderPhotos.length - 1){
      setCount(0);
    }else{
      setCount(count + 1);
    }
  }

  const prewImg = () => {
    if(count === 0){
      setCount(sliderPhotos.length - 1);
    }else{
      setCount(count - 1);
    }
  }

  return (
    <div className='slider'>
      <img src={sliderPhotos[count]} alt='slider' />
      <button onClick={nextImg} className='arrow-left'>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <button onClick={prewImg} className='arrow-right'>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default Slider;
import './home.css';
// Slider
import Slider from '../slider/Slider';

const Home = ({ phones }) => {
  return (
    <div className='home'>
      <Slider />
    </div>
  );
}

export default Home;
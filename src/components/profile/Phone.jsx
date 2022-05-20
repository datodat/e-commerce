import { useState } from 'react';
// Css
import './profile.css';

const Phone = ({ phone, deletePhone, updatePhone }) => {
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState(phone.name);
  const [processor, setProcessor] = useState(phone.processor);
  const [camera, setCamera] = useState(phone.camera);
  const [battery, setBattery] = useState(phone.battery);
  const [price, setPrice] = useState(phone.price);
  const [image, setImage] = useState(phone.img);

  const handleUpdate = (e) => {
    e.preventDefault();
    setEdit(false);

    const phoneObj = {
      name,
      processor,
      camera,
      battery,
      price,
      img: image
    }

    updatePhone(phone.id, phoneObj);
  }

  return (
    <div className='phone-container'>
      <div className='all-phones-list'>
        <p>{phone.name}</p>
        <div>
          <button onClick={() => deletePhone(phone.id)}>Delete</button>
          <button onClick={() => setEdit(!edit)}>{edit ? 'Hide' : 'Edit'}</button>
        </div>
      </div>
      <div
        style={{ display: edit ? 'flex' : 'none' }} 
        className='edit-div'
      >
        <form onSubmit={handleUpdate}>
          <input
            type='text'
            placeholder='name'
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
          <input
            type='text'
            placeholder='Processor'
            value={processor}
            onChange={({ target }) => setProcessor(target.value)}
            required
          />
          <input
            type='text'
            placeholder='Camera'
            value={camera}
            onChange={({ target }) => setCamera(target.value)}
            required
          />
          <input
            type='text'
            placeholder='Battery'
            value={battery}
            onChange={({ target }) => setBattery(target.value)}
            required
          />
          <input
            type='number'
            placeholder='Price'
            value={price}
            onChange={({ target }) => setPrice(target.value)}
            required
          />
          <input
            type='text'
            placeholder='Image'
            value={image}
            onChange={({ target }) => setImage(target.value)}
            required
          />
          <button>save</button>
        </form>
      </div>
    </div>
  );
}

export default Phone;
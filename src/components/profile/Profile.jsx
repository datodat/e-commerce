import { useState } from 'react';
// Css
import './profile.css';
// Phone
import Phone from './Phone';

const Profile = ({ user, allUsers, phones, addPhoneHandler, deleteUser, updateUser, deletePhone, updatePhone }) => {
  const [name, setName] = useState('');
  const [processor, setProcessor] = useState('');
  const [camera, setCamera] = useState('');
  const [battery, setBattery] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();

    const existingPhone = phones.find(i => i.name.toLowerCase() === name.toLowerCase());

    if(existingPhone){
      setErrorMessage('This phone is already added to list');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000)
    }else{
      const phoneObj = {
        name,
        processor,
        camera,
        battery,
        price: Number(price),
        img: image
      }
  
      addPhoneHandler(phoneObj);
      setName('');
      setProcessor('');
      setCamera('');
      setBattery('');
      setPrice('');
      setImage('');
    }
  }

  return (
    <div className='profile'>
      <div className="form-div">
        <form onSubmit={handleAdd}>
          <p>Add phone</p>
          {errorMessage && <p className='error-p'>{errorMessage}</p>}
          <input 
            type='text' 
            placeholder='Name'  
            onChange={({ target }) => setName(target.value)}
            value={name}
            required
          />
          <input 
            type='text' 
            placeholder='Processor'  
            onChange={({ target }) => setProcessor(target.value)}
            value={processor}
            required
          />
          <input 
            type='text' 
            placeholder='Camera'  
            onChange={({ target }) => setCamera(target.value)}
            value={camera}
            required
          />
          <input 
            type='text' 
            placeholder='Battery'  
            onChange={({ target }) => setBattery(target.value)}
            value={battery}
            required
          />
          <input 
            type='number' 
            placeholder='Price' 
            onChange={({ target }) => setPrice(target.value)}
            value={price}
            required
          />
          <input 
            type='text' 
            placeholder='Image Link'  
            onChange={({ target }) => setImage(target.value)}
            value={image}
            required
          />
          <button type='submit'>Add</button>
        </form>
      </div>
      {/*  */}
      {(user && user.admin === true) && (
        <div className='admin-page'>
          {/* All Users */}
          <hr />
          <div className='all-users-div'>
            <p>Users</p>
            {allUsers.length > 0 && allUsers.map(i => {
              return (
                <div className='all-users-list' key={i.id}>
                  <p>{i.username}</p>
                  <div>
                    <button 
                      onClick={i.username === user.username ? 
                        () => alert('This is your account!') : 
                        () => deleteUser(i.id)}
                      >
                        Delete
                      </button>
                    <button 
                      onClick={i.username === user.username ? 
                        () => alert('This is your account!') : 
                        () => updateUser(i.id)}
                    >
                      {i.admin ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* All Phones */}
          <hr style={{ marginTop: "20px" }} />
          <div className='all-phones-div'>
            <p>Phones</p>
            {phones.length > 0 && phones.map(i => {
              return <Phone 
                key={i.id} 
                phone={i} 
                deletePhone={deletePhone} 
                updatePhone={updatePhone}
              />   
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
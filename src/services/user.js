import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/users';

const allUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createUser = async obj => {
  const response = await axios.post(baseUrl, obj);
  return response.data;
}

const updateUser = async id => {
  const response = await axios.put(`${baseUrl}/${id}`);
  return response.data;
}

const deleteUser = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

export default { allUsers, createUser, updateUser, deleteUser } //eslint-disable-line
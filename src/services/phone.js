import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/phones';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const addPhone = async phoneObject => {
  const response = await axios.post(baseUrl, phoneObject);
  return response.data;
}

const updatePhone = async (id, phoneObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, phoneObject);
  return response.data;
}

const deletePhone = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
}

export default { getAll, addPhone, updatePhone, deletePhone } //eslint-disable-line
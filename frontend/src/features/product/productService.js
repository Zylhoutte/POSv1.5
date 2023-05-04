import axios from 'axios';

const API_URL = '/api/products/';

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

export const createProduct = async (product) => {
  const res = await axios.post(`${API_URL}/products`, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await axios.put(`${API_URL}/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/products/${id}`);
  return res.data;
};

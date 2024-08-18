// src/utils/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
instance.interceptors.request.use(config => {
  // Tambahkan token ke header jika diperlukan
  const token = localStorage.getItem('token'); // Atau ambil dari context/Redux
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(response => response, error => {
  // Tangani kesalahan global di sini
  return Promise.reject(error);
});

export default instance;

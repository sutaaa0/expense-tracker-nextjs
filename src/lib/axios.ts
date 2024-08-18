// src/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // URL backend API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

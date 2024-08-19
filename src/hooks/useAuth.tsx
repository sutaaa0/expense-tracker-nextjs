// src/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => api.post('/api/auth/register', payload),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => api.post('/api/auth/login', payload),
    onSuccess: (data) => {
      const { token } = data.data;
      localStorage.setItem('token', token);
    },
  });
};

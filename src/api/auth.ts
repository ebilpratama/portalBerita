import API from './axios';

export const login = (data: { username: string; password: string }) =>
  API.post('/auth/login', data);

export const register = (data: { username: string; email: string; password: string }) =>
  API.post('/auth/register', data);

import axios from 'axios';
import { User, Payment, UserWithPayments } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsersWithPayments = async (): Promise<UserWithPayments[]> => {
  try {
    const response = await api.get('/users-with-payments');
    return response.data;
  } catch (error) {
    console.error('Error fetching users with payments:', error);
    throw error;
  }
};

export const createUser = async (userData: Omit<User, '_id'>): Promise<User> => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const createPayment = async (paymentData: Omit<Payment, '_id'>): Promise<Payment> => {
  try {
    const response = await api.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};
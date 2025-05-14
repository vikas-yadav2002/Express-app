import mongoose from 'mongoose';
import Payment from '../models/Payment.js';
import User from '../models/User.js';

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { email , userId, amount, date } = req.body;
    
    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
     
    const payment = await Payment.create({
      userId,
      amount,
      date: date || new Date(),
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
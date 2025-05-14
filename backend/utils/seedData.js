import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import connectDB from '../config/db.js';

dotenv.config();

const users = [
  {
    name: 'Vikas Yadav',
    email: 'vik@example.com',
  },
  {
    name: 'vikas Smith',
    email: 'vik1@example.com',
  },
  {
    name: 'vikas Johnson',
    email: 'v1@example.com',
  },
  {
    name: 'vikas Williams',
    email: 'vik2@example.com',
  },
  {
    name: 'vikas Brown',
    email: 'vik3@example.com',
  },
];

const generateRandomPayments = (userId) => {
  const payments = [];
  const numberOfPayments = Math.floor(Math.random() * 5) + 1; // 1-5 payments per user
  
  for (let i = 0; i < numberOfPayments; i++) {
    const amount = Math.floor(Math.random() * 900) + 100; // Random amount between 100-999
    const daysAgo = Math.floor(Math.random() * 60); // Random date within the last 60 days
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    payments.push({
      userId,
      amount,
      date,
    });
  }
  
  return payments;
};

const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany();
    await Payment.deleteMany();
    
    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log('Users imported!');
    
    // Generate and insert payments
    const paymentsToInsert = [];
    
    createdUsers.forEach((user) => {
      const userPayments = generateRandomPayments(user._id);
      paymentsToInsert.push(...userPayments);
    });
    
    await Payment.insertMany(paymentsToInsert);
    console.log('Payments imported!');
    
    console.log('Data import completed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
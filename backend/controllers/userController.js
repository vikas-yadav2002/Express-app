import User from '../models/User.js';
import Payment from '../models/Payment.js';

// Get all users with their payments
export const getUsersWithPayments = async (req, res) => {
  try {
    const usersWithPayments = await User.aggregate([
      {
        $lookup: {
          from: 'tbl_user_payment',
          localField: '_id',
          foreignField: 'userId',
          as: 'payments',
        },
      },
    ]);

    res.json(usersWithPayments);
  } catch (error) {
    console.error('Error fetching users with payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single user with payments
export const getUserWithPayments = async (req, res) => {
  try {
    const { id } = req.params;
    
    const userWithPayments = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'tbl_user_payment',
          localField: '_id',
          foreignField: 'userId',
          as: 'payments',
        },
      },
    ]);

    if (userWithPayments.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userWithPayments[0]);
  } catch (error) {
    console.error('Error fetching user with payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new user
export const createUser = async (req, res) => { 
  try {
    const { name, email } = req.body;
    
    const user = await User.create({
      name,
      email,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
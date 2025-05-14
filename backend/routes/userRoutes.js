import express from 'express';
import { getUsersWithPayments, getUserWithPayments, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users-with-payments', getUsersWithPayments);
router.get('/users/:id', getUserWithPayments);
router.post('/users', createUser);

export default router;
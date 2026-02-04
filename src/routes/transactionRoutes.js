import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { deposit, transfer, withdraw } from '../controller/transactionController.js';

const router = express.Router();

router.post('/deposit', deposit);
router.post('/withdraw', protect, withdraw);
router.post('/transfer', protect, transfer);


export const transactionRoutes = router;
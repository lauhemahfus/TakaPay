import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { deposit, withdraw } from '../controller/transactionController.js';

const router = express.Router();

router.post('/deposit', deposit);
router.post('/withdraw', protect, withdraw);


export const transactionRoutes = router;
import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { getMyWallet } from '../controller/walletController.js';

const router = express.Router();

router.get('/me', protect, getMyWallet);

export const walletRoutes = router;

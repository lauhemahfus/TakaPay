import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { getMyCashTransactionHistory, getMyP2PTransactionHistory, getMyTransactionHistory, getMyWallet, pauseMyWallet, unpauseMyWallet } from '../controller/walletController.js';

const router = express.Router();

router.get('/me', protect, getMyWallet);
router.put('/pause', protect, pauseMyWallet);
router.put('/unpause', protect, unpauseMyWallet);
router.get('/history', protect, getMyTransactionHistory);
router.get('/history/p2p', protect, getMyP2PTransactionHistory);
router.get('/history/cash', protect, getMyCashTransactionHistory);

export const walletRoutes = router;

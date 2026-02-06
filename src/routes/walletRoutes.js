import express from 'express'
import { protect } from '../middleware/authMiddleware.js';
import { getMyWallet, pauseMyWallet, unpauseMyWallet } from '../controller/walletController.js';

const router = express.Router();

router.get('/me', protect, getMyWallet);
router.put('/pause', protect, pauseMyWallet);
router.put('/unpause', protect, unpauseMyWallet);

export const walletRoutes = router;

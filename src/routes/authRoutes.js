import express from 'express'
import { getMe, login, register } from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export const authRoutes = router;

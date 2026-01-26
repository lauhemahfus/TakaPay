import express from 'express'
import { login, register } from '../controller/authController.js';


const router = express.Router();

router.post('/signup', register);
router.post('/login', login);

export const authRoutes = router;

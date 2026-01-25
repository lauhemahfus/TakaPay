import express from 'express'
import { userRegister } from '../controller/authController.js';


const router = express.Router();

router.post('/register', userRegister);

export const authRoutes = router;

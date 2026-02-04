import express from 'express';
import 'dotenv/config';
import { authRoutes } from './routes/authRoutes.js';
import { walletRoutes } from './routes/walletRoutes.js';
import { transactionRoutes } from './routes/transactionRoutes.js';


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;


app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API is running'
    })
});

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/transaction', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})
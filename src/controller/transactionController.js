import { creditUserWallet, debitUserWallet } from "../service/transactionService.js";
import { findUserByPhone } from "../service/userService.js";
import { findWalletByUserId } from "../service/walletService.js";

export const deposit = async (req, res, next) => {
    try {
        const {phone, amount, description} = req.body;
        const user = await findUserByPhone(phone);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found"
            });
        }
        
        const wallet = await findWalletByUserId(user.id);

        const transaction = await creditUserWallet(wallet.id, amount, description);
        
        return res.status(200).json({
            success: true,
            message: "Deposit successful",
            transaction: {
                transactionId: transaction.transactionId,
                walletId: transaction.walletId,
                amount: transaction.amount,
                balance: transaction.balance,
                type: transaction.type,
                status: transaction.status,
                createAt: transaction.createAt
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during transactions",
            error: error.message
        });
    }
}

export const withdraw = async(req, res, next) => {
    try {
        const userId = req.user.id;
        const {amount, description} = req.body;

        if(amount < 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than 0"
            });
        }
        
        const wallet = await findWalletByUserId(userId);

        if(wallet.balance < amount){
            return res.status(400).json({
                success: false,
                message: "Insufficient balance"
            });
        }
        const transaction = await debitUserWallet(wallet.id, amount, description);

        return res.status(200).json({
            success: true,
            message: "Withdraw successful",
            transaction: {
                transactionId: transaction.transactionId,
                walletId: transaction.walletId,
                amount: transaction.amount,
                balance: transaction.balance,
                type: transaction.type,
                status: transaction.status,
                createAt: transaction.createAt
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during transactions",
            error: error.message
        });
    }
}
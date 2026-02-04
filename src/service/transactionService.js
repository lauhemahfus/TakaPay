import { db } from "../config/prisma.js"

export const creditUserWallet = async (walletId, amount, description) => {
    try {
        const updateWallet = await db.wallet.update({
            where: {
                id: walletId,
            },
            data: {
                balance: {increment: amount}
            }
        });
        const transaction = await db.cashTransaction.create({
            data: {
                walletId: walletId,
                amount: amount,
                type: 'CASH_IN',
                description: description 
            }
        });
        
        return {
            transactionId: transaction.id,
            walletId: updateWallet.id,
            amount: transaction.amount,
            balance: updateWallet.balance,
            type: transaction.type,
            status: transaction.status,
            createAt: transaction.createdAt
        };

    } catch (error) {
        return error;
    }
}


export const debitUserWallet = async (walletId, amount, description) => {
    try {
        const updateWallet = await db.wallet.update({
            where: {
                id: walletId,
            },
            data: {
                balance: {decrement: amount}
            }
        });
        const transaction = await db.cashTransaction.create({
            data: {
                walletId: walletId,
                amount: amount,
                type: 'CASH_OUT',
                description: description 
            }
        });
        
        return {
            transactionId: transaction.id,
            walletId: updateWallet.id,
            amount: transaction.amount,
            balance: updateWallet.balance,
            type: transaction.type,
            status: transaction.status,
            createAt: transaction.createdAt
        };

    } catch (error) {
        return error;
    }
}
import { db } from "../config/prisma.js"

export const creditUserWallet = async (walletId, amount, description) => {
    try {
        const [updateWallet, transaction] = await db.$transaction([
            db.wallet.update({
                where: {
                    id: walletId,
                },
                data: {
                    balance: {increment: amount}
                }
            }),
            db.cashTransaction.create({
                data: {
                    walletId: walletId,
                    amount: amount,
                    type: 'CASH_IN',
                    description: description 
                }
            })
        ]);
        
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
        throw error;
    }
}


export const debitUserWallet = async (walletId, amount, description) => {
    try {
        const [updateWallet, transaction] = await db.$transaction([
            db.wallet.update({
                where: {
                    id: walletId,
                },
                data: {
                    balance: {decrement: amount}
                }
            }),
            db.cashTransaction.create({
                data: {
                    walletId: walletId,
                    amount: amount,
                    type: 'CASH_OUT',
                    description: description 
                }
            })
        ]);
        
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
        throw error;
    }
}

export const transferMoney = async (senderWalletId, receiverWalletId, amount, description) => {
    try {
        const [updateSender, updateReceiver, transaction] = await db.$transaction([
            db.wallet.update({
                where: {
                    id: senderWalletId,
                },
                data: {
                    balance: {decrement: amount}
                }
            }),
            db.wallet.update({
                where: {
                    id: receiverWalletId,
                },
                data: {
                    balance: {increment: amount}
                }
            }),
            db.p2PTransaction.create({
                data: {
                    senderWalletId: senderWalletId,
                    receiverWalletId: receiverWalletId,
                    amount: amount,
                    description: description 
                }
            })
        ]);
        
        return {
            transactionId: transaction.id,
            amount: transaction.amount,
            balance: updateSender.balance,
            status: transaction.status,
            createAt: transaction.createdAt
        };
    } catch (error) {
        throw error;
    }
    
}
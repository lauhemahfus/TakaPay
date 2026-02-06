import { db } from "../config/prisma.js";

export const createWalletForUser = async (userId, tx = db) => {
    try {
        
        return await tx.wallet.create({
            data:{
                userId: userId
            }
        });

    } catch (error) {
        throw error;
    }
}


export const findWalletByUserId = async (userId) => {
    try {
        return await db.wallet.findUnique({
            where: {
                userId: userId
            }
        })
    } catch (error) {
        throw error;
    }
}

export const updateWalletStatus = async (walletId, status) => {
    try {
        return await db.wallet.update({
            where: {
                id: walletId
            },
            data: {
                status: status
            }
        })
    } catch (error) {
        throw error;
    }
}

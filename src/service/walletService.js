import { db } from "../config/prisma.js";

export const createWalletForUser = async (userId) => {
    try {
        
        return await db.wallet.create({
            data:{
                userId: userId
            }
        });

    } catch (error) {
        return error;
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
        return error;
    }
}
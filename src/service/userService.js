import { db } from "../config/prisma.js";
import { hashPassword } from "../utils/password.js";

export const createUser = async (userInfo) => {
    try {
        const hashedPassword = await hashPassword(userInfo.password);
        
        return db.user.create({
            data:{
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                password: hashedPassword,
            }
        });

    } catch (error) {
        throw error;
    }
}

export const findUserByEmail = async (email) => {
    try {
        return await db.user.findFirst({
            where: {
                email: email
            }
        });
    } catch (error) {
        throw error;
    }
}

export const findUserByPhone = async (phone) => {
    try {
        return await db.user.findFirst({
            where: {
                phone: phone
            }
        });
    } catch (error) {
        throw error;
    }
}

export const findUserByID = async (id) => {
    try {
        return await db.user.findFirst({
            where: {
                id: id
            }
        });
    } catch (error) {
        throw error;
    }
}

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
        return error;
    }
}

export const findUserByEmail = async (email) => {
    return await db.user.findFirst({
        where: {
            email: email
        }
    });
}

export const findUserByID = async (id) => {
    return await db.user.findFirst({
        where: {
            id: id
        }
    });
}

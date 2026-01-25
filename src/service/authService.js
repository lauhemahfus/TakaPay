import { db } from "../config/prisma.js";

export async function createUser (userInfo) {
    try {
        return db.user.create({
            data:{
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                password: userInfo.password,
            }
        });

    } catch (error) {
        return error;
    }
}
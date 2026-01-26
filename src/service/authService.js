import { db } from "../config/prisma.js";
import { hashPassword } from "../utils/password.js";

export async function createUser (userInfo) {
    try {
        const hashedPassword = await hashPassword(userInfo.password);
        console.log(hashedPassword);
        
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
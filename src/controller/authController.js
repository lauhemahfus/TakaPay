import { createUser } from "../service/authService.js";

export const userRegister = async (req, res) => {
    
    try {
        const {name, email, phone, password} = req.body;
        
        const user = await createUser({name, email, phone, password});
        return res.status(201).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}
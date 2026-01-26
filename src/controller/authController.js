import { createUser, findUser } from "../service/authService.js";
import { verifyPassword } from "../utils/password.js";

export const register = async (req, res) => {
    
    try {
        const {name, email, phone, password} = req.body;
        
        const user = await createUser({name, email, phone, password});
        return res.status(201).json({
            success: true,
            message: "Signup successful",
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
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await findUser(email);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        if(verifyPassword(user.password, password)){
            return res.status(200).json({
                success: true,
                message: "Login successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }); 
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
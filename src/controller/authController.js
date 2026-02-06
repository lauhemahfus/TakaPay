import { createUser, findUserByEmail, findUserByID } from "../service/userService.js";
import { createWalletForUser } from "../service/walletService.js";
import { generateToken } from "../utils/jwt.js";
import { verifyPassword } from "../utils/password.js";

export const register = async (req, res) => {
    
    try {
        const {name, email, phone, password} = req.body;

        if(!name || !email || !phone || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await createUser({name, email, phone, password});
        const wallet = await createWalletForUser(user.id);
        
        return res.status(201).json({
            success: true,
            message: "Signup successful",
            user: {
                id: user.id,
                wallet_id: wallet.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during signup",
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await findUserByEmail(email);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        if(await verifyPassword(user.password, password)){
            return res.status(200).json({
                success: true,
                message: "Login successful",
                accessToken: generateToken(user.id),
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
        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
            error: error.message
        });
    }
}

export const getMe = async (req, res, next) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "User not login"
            });
        }
        const user = await findUserByID(id);
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during fetching user data",
            error: error.message
        });
    }
}
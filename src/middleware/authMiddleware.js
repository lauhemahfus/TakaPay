import { findUserByID } from "../service/userService.js";
import { decodeJWT } from "../utils/jwt.js";

export const protect  = async (req, res, next) => {
    try {
        let accessToken;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            accessToken = req.headers.authorization.split(' ')[1];
        }

        if(!accessToken){
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route"
            });
        }

        const decoded = decodeJWT(accessToken);

        if(!decoded) { 
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        const user = await findUserByID(decoded.id);

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }
        req.user = {
            id: user.id
        };
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route"
        });
    }
}
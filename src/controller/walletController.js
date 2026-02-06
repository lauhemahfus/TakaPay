import { findWalletByUserId, updateWalletStatus } from "../service/walletService.js";

export const getMyWallet = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "User not login"
            });
        }
        const wallet = await findWalletByUserId(userId);
        if(!wallet) {
            return res.status(400).json({
                success: false,
                message: "No wallet found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "User wallet fetched successfully",
            wallet: {
                user_id: userId,
                wallet_id: wallet.id,
                balance: wallet.balance,
                status: wallet.status
            }
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during fetching wallet data",
            error: error.message
        });
    }
}


export const pauseMyWallet = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "User not login"
            });
        }
        const wallet = await findWalletByUserId(userId);
        if(!wallet) {
            return res.status(400).json({
                success: false,
                message: "No wallet found"
            });
        }
        if(wallet.status !== "ACTIVE"){
            return res.status(403).json({
                success: false,
                message: `Cannot change status. Wallet is ${wallet.status}`
            });
        }
        const updateWallet = await updateWalletStatus(wallet.id, 'PAUSED');

        return res.status(200).json({
            success: true,
            message: "User wallet update successfully",
            wallet: {
                user_id: userId,
                wallet_id: updateWallet.id,
                balance: updateWallet.balance,
                status: updateWallet.status,
                createdAt: updateWallet.createdAt,
                updateAt: updateWallet.updatedAt
            }
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during updating wallet data",
            error: error.message
        });
    }
}

export const unpauseMyWallet = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "User not login"
            });
        }
        const wallet = await findWalletByUserId(userId);
        if(!wallet) {
            return res.status(400).json({
                success: false,
                message: "No wallet found"
            });
        }
        if(wallet.status !== "PAUSED"){
            return res.status(403).json({
                success: false,
                message: `Cannot change status. Wallet is ${wallet.status}`
            });
        }
        const updateWallet = await updateWalletStatus(wallet.id, 'ACTIVE');

        return res.status(200).json({
            success: true,
            message: "User wallet update successfully",
            wallet: {
                user_id: userId,
                wallet_id: updateWallet.id,
                balance: updateWallet.balance,
                status: updateWallet.status,
                createdAt: updateWallet.createdAt,
                updateAt: updateWallet.updatedAt
            }
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during updating wallet data",
            error: error.message
        });
    }
}
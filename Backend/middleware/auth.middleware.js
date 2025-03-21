const adminModel = require('../models/admin.model')
const bcrpt = require('bcrypt');
const jwt = require('jsonwebtoken')
const blackListToken = require('../models/blackListToken.model');

module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        console.log("not valid token");
        return res.status(401).json({ message: 'Token not provided' })
    }

    try {
        // Check if token is blacklisted
        const isBlacklist = await blackListToken.findOne({ token });
        if (isBlacklist) {
            return res.status(401).json({ message: "Session expired. Please login again." });
        }

        // Verify token and check expiration
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if token is expired
        const tokenCreatedAt = new Date(decoded.iat * 1000);
        const now = new Date();
        const hoursDiff = (now - tokenCreatedAt) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
            // Token is expired, add to blacklist
            await blackListToken.create({ token });
            return res.status(401).json({ message: "Session expired. Please login again." });
        }

        const admin = await adminModel.findById(decoded._id);
        if (!admin) {
            return res.status(401).json({ message: "User not found" });
        }

        req.admin = admin;
        return next();
    } catch (e) {
        console.log("invalid token");
        return res.status(401).json({ message: 'Token is not valid' })
    }
}

module.exports.authCaption = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        console.log("not valid token");
        return res.status(401).json({ message: 'Token not provided' })
    }

    const isBlacklist = await captionModel.findOne({ token: token })

    if (isBlacklist) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const caption = await captionModel.findById(decoded._id);
        req.caption = caption;

        return next();
    } catch (e) {
        console.log("invalid token");
        return res.status(401).json({ message: 'Token is not valid' })
    }
}
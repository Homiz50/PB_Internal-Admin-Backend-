const adminModel = require('../models/admin.model')
const bcrpt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

    if (!token) {
        console.log("not valid token");
        return res.status(401).json({ message: 'Token not provided' })
    }

    const isBlacklist = await adminModel.findOne({ token: token })

    if (isBlacklist) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await adminModel.findById(decoded._id);
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
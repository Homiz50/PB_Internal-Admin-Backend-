const adminModel =require('../models/admin.model')
const adminServices = require('../services/admin.service')
const { validationResult } = require('express-validator')
const blackListToken = require('../models/blackListToken.model');
const jwt = require('jsonwebtoken');

module.exports.registerAdmin = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { firstname, lastname, number,role, password } = req.body;


    const isAdminAlreadyExist = await adminModel.findOne({ number })

    if (isAdminAlreadyExist)
    {
        return res.status(400).json({ message: 'number already exist' })
    }
        
    const hashPassword = await adminModel.hashPassword(password);

    const admin = await adminServices.createAdmin(
        firstname,
        lastname,
        role,
        number,
        hashPassword
    )

    const token = await admin.generateAuthToken();

    res.json({ token, admin });
}

module.exports.loginAdmin = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { number, password } = req.body;

    const admin = await adminModel.findOne({ number: number }).select('+password');

    if (!admin) return res.status(401).json({ message: 'number and Password Are Not Match' });

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) return res.status(401).json({ message: 'number and Password Are Not Match' });

    // Generate token with 24-hour expiration
    const token = jwt.sign(
        { _id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Token expires in 24 hours
    );

    // Set cookie with 24-hour expiration
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    });

    res.json({ token, admin });
}

module.exports.getAdminProfile = async (req, res, next) => {
    res.status(200).json(req.admin);
}

module.exports.logoutAdmin = async (req, res, next) => {
    res.clearCookie('token'); // Clear the token 

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    console.log(token)
    await blackListToken.create({ token })

    res.status(200).json({ message: 'Logged out successfully' }); // Respond with a success message
}

const adminModel =require('../models/admin.model')
const adminServices = require('../services/admin.service')
const { validationResult } = require('express-validator')
const blackListToken = require('../models/blackListToken.model');

module.exports.registerAdmin = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { firstname, lastname, number, password } = req.body;


    const isAdminAlreadyExist = await adminModel.findOne({ number })

    if (isAdminAlreadyExist)
    {
        return res.status(400).json({ message: 'number already exist' })
    }
        
    const hashPassword = await adminModel.hashPassword(password);

    const admin = await adminServices.createAdmin(
        firstname,
        lastname,
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

    const token = await admin.generateAuthToken();

    res.cookie('token', token)

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
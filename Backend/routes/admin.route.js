const express = require('express');
const routes = express.Router();
const { body } = require('express-validator');
const adminController = require('../controllers/admin.controllers.js');
const authMiddlewer = require('../middleware/auth.middleware.js');
const blackListToken = require('../models/blackListToken.model');

routes.post('/register', [
    body('firstname').notEmpty().withMessage('Please enter your first name'),
    body('lastname'),
    body('number')
    .notEmpty().withMessage('Please enter your number')
    .isLength({ min: 10 }).withMessage('Please enter a valid number'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
],
    adminController.registerAdmin
)

routes.post('/login', [
    body('number').notEmpty().withMessage("Places Enter number"),
    body('password').notEmpty().withMessage("Place Enter Password")
],
    adminController.loginAdmin
)

routes.get('/logout', authMiddlewer.authAdmin, async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await blackListToken.create({ token });
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during logout' });
    }
});
routes.get('/new1112', (req,res)=>{console.log("mew")});

routes.get('/profile', authMiddlewer.authAdmin, adminController.getAdminProfile);

module.exports = routes;

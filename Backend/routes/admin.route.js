const express = require('express');
const routes = express.Router();
const { body } = require('express-validator');
const adminController = require('../controllers/admin.controllers.js');
const authMiddlewer = require('../middleware/auth.middleware.js');
const { replaceOne } = require('../models/admin.model.js');

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

routes.get('/logout', authMiddlewer.authAdmin, adminController.logoutAdmin)

routes.get('/profile', authMiddlewer.authAdmin, adminController.getAdminProfile)

module.exports = routes;

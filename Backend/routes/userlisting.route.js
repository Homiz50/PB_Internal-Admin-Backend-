const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const { userlisting } = require('../controllers/userlisting.controllers');
const {showingUserProperty} = require('../controllers/userlisting.controllers')
const Property = require('../models/userListing.model'); // Adjust the path as necessary
const upload = require('../middleware/upload.middleware');

// Create a route to handle form submission with media uploads
router.post('/api/properties', upload.array('images', 10), userlisting);

// GET route to fetch all user listings
router.get('/api/properties',showingUserProperty);

// GET route to fetch properties by lister
router.get('/api/properties/lister/:lister', async (req, res) => {
    try {
        const properties = await Property.find({ lister: req.params.lister }).select('-images');
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties by lister', error: error.message });
    }
});

module.exports = router;
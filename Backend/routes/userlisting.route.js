const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const { userlisting } = require('../controllers/userlisting.controllers');
const Property = require('../models/userListing.model'); // Adjust the path as necessary
const upload = require('../middleware/upload.middleware');

// Create a route to handle form submission with media uploads
router.post('/api/properties', upload.array('images', 10), userlisting);

// GET route to fetch all user listings
router.get('/api/properties', async (req, res) => {
    try {
        const properties = await Property.find(); // Fetch all properties
        res.status(200).json(properties); // Send the properties as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
});

module.exports = router;
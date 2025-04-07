const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const { userlisting } = require('../controllers/userlisting.controllers');

// Create a route to handle form submission
router.post('/api/properties', userlisting);

module.exports = router;
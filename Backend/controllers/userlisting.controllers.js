const mongoose = require('mongoose');
const { createProperty } = require('../services/userListing.service');

module.exports.userlisting = async (req, res) => {
    try {
        const propertyData = req.body;
        const property = await createProperty(propertyData);
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
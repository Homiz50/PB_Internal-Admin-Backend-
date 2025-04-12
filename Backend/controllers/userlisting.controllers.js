const mongoose = require('mongoose');
const { createProperty } = require('../services/userListing.service');

module.exports.userlisting = async (req, res) => {
    try {
        console.log('Received body:', req.body); // Debug log
        
        const propertyData = {
            ...req.body,
            images: []
        };

        // Handle media uploads if files are present
        if (req.files && req.files.length > 0) {
            propertyData.images = req.files.map(file => ({
                data: file.buffer,
                contentType: file.mimetype,
                type: file.mimetype.startsWith('video/') ? 'video' : 'image'
            }));
        }

        console.log('Property data to be saved:', propertyData); // Debug log
        const property = await createProperty(propertyData);
        res.status(201).json(property);
    } catch (error) {
        console.error('Error in userlisting controller:', error); // Debug log
        res.status(400).json({ error: error.message });
    }
};
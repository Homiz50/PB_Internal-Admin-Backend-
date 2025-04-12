const mongoose = require('mongoose');
const { createProperty } = require('../services/userListing.service');

module.exports.userlisting = async (req, res) => {
    try {
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

        const property = await createProperty(propertyData);
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
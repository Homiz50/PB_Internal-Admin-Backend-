const express = require('express');
const routes = express.Router();
const { body } = require('express-validator');
const propartyController = require('../controllers/Property.controllers.js');
const propartyMiddlewer = require('../middleware/auth.middleware.js')
const Property = require("../models/property.model.js")
const multer = require('multer');
const propertyService = require('../services/property.service.js');


// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

routes.post('/upload-property/:company/:categories', upload.single('file'), async (req, res) => {
    try {
        const { company, categories } = req.params;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'File is required' });
        }

        // Call the service to process the file
        const propertyList = await propertyService.processExcelFile(file.path, company, categories);

        res.status(201).json(propertyList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

routes.get('/companydata/:company/:categories', async (req, res) => {
    try {
        const { company, categories } = req.params;  // Now reading from URL params

        const propertyData = await Property.find({ company, categories })
            .sort({ 'data.owner_name': 1 })
            .collation({ locale: "en", strength: 2 });

        res.status(200).json(propertyData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
});


routes.put('/property/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        
        // Find the property by ID
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // Update all fields from the data object
        property.data = {
            ...property.data,  // Keep existing data
            ...data,          // Override with new data
            date: data.date || property.data.date,
            type: data.type || property.data.type,
            price: data.price || property.data.price,
            bhk: data.bhk || property.data.bhk,
            squr: data.squr || property.data.squr,
            project_name: data.project_name || property.data.project_name,
            address: data.address || property.data.address,
            area: data.area || property.data.area,
            description: data.description || property.data.description,
            sub_type: data.sub_type || property.data.sub_type,
            owner_name: data.owner_name || property.data.owner_name,
            number: data.number || property.data.number,
            furniture: data.furniture || property.data.furniture,
            status: data.status || property.data.status,
            remark: data.remark || property.data.remark
        };
        
        // Save the updated property
        const updatedProperty = await property.save();
        
        res.status(200).json(updatedProperty);
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ error: error.message });
    }
});




module.exports = routes;
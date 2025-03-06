const propertyModel = require('../models/property.model')
const { validationResult } = require('express-validator')
const propertyService = require('../services/property.service')

module.exports.propartyadd = async (req, res, next) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            console.log("this is Controoler")
            return res.status(400).json({ errors: error.array() })
        }

        const { data, company, categories } = req.body;

        if (!company && !categories) {
            return res.status(400).json({ error: 'Property data is required' });
        }
        // const propertyList = await propertyService.createproperty(categories, company, data);
        
        // res.status(201).json(propertyList);
    } catch (error) {
        next(error);
    }

    // add file 
    try {
        const { company, categories } = req.params;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'File is required' });
        }

        // Call the service to process the file
        const propertyList = await propertyService.processExcelFile(file.path, company, categories , data);

        res.status(201).json(propertyList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

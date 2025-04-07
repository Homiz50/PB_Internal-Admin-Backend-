const Property = require('../models/userListing.model');

// Service to create a new property
const createProperty = async (propertyData) => {
    try {
        const property = new Property(propertyData);
        await property.save();
        return property;
    } catch (error) {
        throw new Error('Error creating property: ' + error.message);
    }
};

module.exports = {
    createProperty
};

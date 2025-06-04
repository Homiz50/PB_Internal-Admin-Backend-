const xlsx = require("xlsx");
const propertyModel = require('../models/property.model');
const fs = require('fs');

module.exports.processExcelFile = async (filePath, company, categories) => {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    // Process each row in the Excel file
    const propertyList = [];
    for (const row of data) {
        const propertyData = {
            company,
            categories,
            data: {
                title: row.title || "",
                listedDate: row.date ? new Date(row.date) : new Date(),
                date: row.date || "",
                type: row.type || "-",
                rent: row.rent || "",
                rentValue: parseFloat(row.rentValue) || 0,
                bhk: row.bhk || "",
                furnishedType: row.furnishedType || "-",
                squareFt: row.squareFt || "",
                sqFt: row.sqFt || 0,
                address: row.address || "",
                area: row.area || "",
                city: row.city || "",
                status: row.status || "-",
                age: row.age || "",
                tenant: row.tenant || "",
                facing: row.facing || "",
                totalFloors: row.totalFloors || "",
                brokerage: row.brokerage || "",
                balconies: row.balconies || "",
                washroom: row.washroom || "",
                description: row.description || "",
                userType: row.userType || "",
                unitType: row.sub_type || "-",
                propertyCurrentStatus: row.call_Status || "-",
                description1: row.description1 || "",
                key: row.key || "",
                name: row.name || "",
                number: row.number || "",
                isDeleted: 0,
                isSaved: 1,
                remark: row.remark || "",
                createdOn: new Date()
            }
        };

        try {
            // Save each property to the database
            const property = await propertyModel.create(propertyData);
            propertyList.push(property);
        } catch (error) {
            console.error('Error saving property:', error);
            throw new Error(`Error saving property: ${error.message}`);
        }
    }

    // Remove the file after processing
    fs.unlinkSync(filePath);

    return propertyList;
};



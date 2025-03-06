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
                date: row.date || "",
                owner_name: row.owner_name || "",
                project_name: row.project_name || "",
                number: row.number || "",
                price: row.price || "",
                squr: row.squr || "",
                bhk: row.bhk || "",
                remark: row.remark || "",
                area: row.area || "",
                address: row.address || "",
                description: row.description || "",
                furniture: row.furniture || "-",
                type: row.type || "-",
                sub_type: row.sub_type || "-",
                status: row.status || "-",
                call_Status: row.call_Status || "-"
            }
        };

        // Save each property to the database
        const property = await propertyModel.create(propertyData);
        propertyList.push(property);
    }

    // Remove the file after processing
    fs.unlinkSync(filePath);

    return propertyList;
};



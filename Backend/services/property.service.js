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
                listedDate: row.listedDate ? new Date(row.listedDate) : new Date(),
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
                nearby:row.nearby || "",
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
                unitType: row.unitType || "",
                unitNo: row.unitNo || "",
                floorNo: row.floorNo || "-",
                propertyCurrentStatus: row.propertyCurrentStatus || "-",
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


module.exports.searchpremiseandaddress = async (query)=> {
    try {
      if (!query) {
        throw new Error("Search query is required");
      }

      // Create case-insensitive regex pattern for the search query
      const searchPattern = new RegExp(query, 'i');

      // Search across multiple fields
      const properties = await propertyModel.find(
        {
          $or: [
            { 'data.title': searchPattern },
            { 'data.area': searchPattern },
            { 'data.nearby': searchPattern },
          ],
          isDeleted: { $ne: 1 }
        },
        { 'data.title': 1, 'data.area': 1, 'data.nearby': 1, _id: 0 }
      ).sort({ createdOn: -1 });

      console.log(`Found ${properties.length} properties matching query: ${query}`);

      return {
        success: true,
        data: properties.map(p => ({
          title: p.data.title,
          area: p.data.area,
          nearby: p.data.nearby
        }))
      };
    } catch (error) {
      console.error('Error searching properties:', error);
      throw new Error(error.message || "Failed to search properties");
    }
  }



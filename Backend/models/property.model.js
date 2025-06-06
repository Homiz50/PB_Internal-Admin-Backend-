const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true,
        properties: {
            title: String,
            listedDate: Date,
            date: String,
            type: String,
            rent: String,
            rentValue: Number,
            bhk: String,
            furnishedType: String,
            squareFt: String,
            sqFt: String,
            address: String,
            area: String,
            nearby:String,
            city: String,
            status: String,
            age: String,
            tenant: String,
            facing: String,
            totalFloors: String,
            brokerage: String,
            balconies: String,
            washroom: String,
            description: String,
            userType: String,
            unitType: String,
            unitNo:String,
            floorNo:String,
            propertyCurrentStatus: String,
            description1: String,
            key: String,
            name: String,
            number: String,
            isDeleted: Number,
            isSaved: Number,
            remark: String,
            createdOn: {
                type: Date,
                default: Date.now
            }
        }
    }
}, {
    timestamps: true
});

// const propertyShow = mongoose.model("propertyShow" , PropertyShow)
module.exports = mongoose.model('Property', propertySchema);



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
        date: {
            type: String,
           default:""
        },
        owner_name: {
            type: String,
            default:""
        },
        number: {
            type: String,
            default:""
        },
        project_name: {
            type: String,
            default:""
        },
        squr: {
            type: String,
            default:""
        },
        bhk: {
            type: String,
            default:""
        },
        price:{
            type:String,
            default:""
        },
        remark: {
            type: String,
            default:""
        }, 
        area: {
            type: String,
            default:""
        },
        address: {
            type: String,
            default:""
        },
        description: {
            type: String,
            default:""
        },
        furniture: {
            type: String,
            default:"-",
        },
        type: {
            type: String,
            default:"-",
        },
        sub_type: {
            type: String,
            default:"-",   
        },
        status: {
            type: String,
            default: "-"
        },
        call_Status:{
            type:String,
            default:"-"
        }
    }
}, {
    timestamps: true
});

// const propertyShow = mongoose.model("propertyShow" , PropertyShow)
module.exports = mongoose.model('Property', propertySchema);


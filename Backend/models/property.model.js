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

// module.exports.deletePropertiesByIds = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         console.log(id);
//         if (!id) {
//             return res.status(400).json({ message: 'Id is required' });
//         }
//         const idArray = id.split(',').map(id => id.trim()).filter(id => id).map(id => mongoose.Types.ObjectId(id));
//         console.log(idArray);
//         if (idArray.length === 0) {
//             return res.status(400).json({ message: 'Valid Ids are required' });
//         }
//         console.log({ _id: { $in: idArray } });
//         const results = await propertyModel.deleteMany({ _id: { $in: idArray } });
//         console.log(results);
//         if (results.deletedCount === 0) {
//             return res.status(404).json({ message: 'No properties found with the given ids' });
//         }
//         res.status(200).json({ message: `${results.deletedCount} properties deleted successfully` });
//     } catch (error) {
//         next(error);
//     }
// };


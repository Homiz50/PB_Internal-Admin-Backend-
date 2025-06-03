const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        minlength: [3, 'Firs Name Min Length is 3']
    },

    lastname: {
        type: String,
        minlength: [3, 'Last Name Min Length is 3']
    },
    role: {
        type: String,
        },

    number: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        select: false,

    },
})

AdminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn:'24h'})
    return token
}

AdminSchema.methods.comparePassword = async function (password) {
    console.log('comparePassword')
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

AdminSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const adminModel = mongoose.model('admin', AdminSchema)

module.exports = adminModel;
const adminModel = require('../models/admin.model')

module.exports.createAdmin = async (firstname, lastname,role, number, password) => {
    if (!firstname || !lastname || !number || !password) {
        throw new Error('All Fields Are Required')
    }

    const admin = await adminModel.create({
        firstname,
        lastname,
        role,
        number,
        password,
    })

    return admin
}


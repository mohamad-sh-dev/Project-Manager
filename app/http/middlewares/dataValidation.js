const {
    userSchema
} = require("../../schemas/userSchema")
const {
    createValidateWithAjv
} = require("../validations/schemaCompile")

exports.dataValidation = (request, response, next) => {

    const validation = createValidateWithAjv(userSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            // message: validation.errors
            message: validation.errors.map(error => {
                return {
                    message: error.message ,
                    property: error.instancePath
                }
            })
        })
    }
    next()
}
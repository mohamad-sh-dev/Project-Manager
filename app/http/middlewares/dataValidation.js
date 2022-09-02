const {
    createValidateWithAjv
} = require("../validations/schemaCompile")
const {
    registerUserSchema,
    loginUserSchema,
    editProfileSchema
} = require('../../schemas/userSchema');

exports.registerDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(registerUserSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            // message: validation.errors
            message: validation.errors.map(error => {
                return {
                    message: error.message,
                    property: error.instancePath
                }
            })
        })
    }
    next()
}
exports.loginUserDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(loginUserSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                return {
                    message: error.message,
                    property: error.instancePath
                }
            })
        })
    }
    next()
}
exports.editProfileDataValidation = (request, response, next) => {
    const validation = createValidateWithAjv(editProfileSchema, request.body)
    if (validation.errors) {
        return response.status(400).json({
            status: 'fail',
            message: validation.errors.map(error => {
                if (error.keyword === 'errorMessage') {
                  return  error.params.errors.map(e => {
                    return {
                            message: error.message,
                            property: e.params.additionalProperty || e.params.missingProperty
                        }
                    })
                } else {
                    return {
                        message: error.message,
                        property: error.instancePath
                    }
                }

            })
        })
    }
    next()
}
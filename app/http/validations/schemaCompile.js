const Ajv = require('ajv').default;
const ajv = new Ajv({
    allErrors: true,
    $data: true
})
require('ajv-errors')(ajv)
ajv.addKeyword('userSchema')
ajv.addKeyword('errorMessages')
const createValidateWithAjv = (schema, object) => {
    const validate = ajv.compile(schema);
    const valid = validate(object);
    return {
        errors: validate.errors,
        isValid: valid
    }
}

module.exports = {
    createValidateWithAjv
}
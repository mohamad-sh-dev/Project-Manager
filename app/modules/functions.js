/* eslint-disable no-undef */
const {
    verify,
    sign
} = require('jsonwebtoken');

exports.createToken = (payload) => {
    return sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1 day'
    });
}

exports.verifyJwtToken = (token) => {
    return verify(token, process.env.SECRET_KEY)
}

exports.filterObj = (obj, allowedfields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if (allowedfields.includes(el.toLowerCase())) {
            newObj[el] = obj[el]
        }
    })
    return newObj
}
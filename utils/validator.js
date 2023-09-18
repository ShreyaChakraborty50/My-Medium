
const validator = require('validator');

const isEmailValid = (email) => {
    return validator.isEmail(email);
}

const isPasswordValid = (password) => {
    return validator.isLength(password, { min: 8 })
};

module.exports = {
    isEmailValid, isPasswordValid
}
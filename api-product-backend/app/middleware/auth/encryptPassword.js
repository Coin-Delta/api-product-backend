const bcrypt = require('bcrypt');

// Middleware function for encrypting passwords
const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        return encryptedPassword;
    } catch (error) {
        throw new Error('Internal server error');
    }
};

module.exports = { encryptPassword };
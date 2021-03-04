const bcrypt = require("bcryptjs");

const securePassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword;
};

const matchPassword = async (password, hashedPassword) => {
    const isMatched = await bcrypt.compare(password, hashedPassword);
    return isMatched;
};

module.exports = { securePassword, matchPassword };

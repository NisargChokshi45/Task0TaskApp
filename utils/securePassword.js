const bcrypt = require("bcryptjs");

const securePassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 8);
    //     console.log(password);
    //     console.log(hashedPassword);
    return hashedPassword;
};

const matchPassword = async (password, hashedPassword) => {
    const isMatched = await bcrypt.compare(password, hashedPassword);
    return isMatched;
};

module.exports = { securePassword, matchPassword };

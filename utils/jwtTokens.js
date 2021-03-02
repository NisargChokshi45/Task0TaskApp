const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const tokenGeneration = async (tokenQuery) => {
    const token = jwt.sign(tokenQuery, secretKey, {
        expiresIn: "7 days",
    });
    return token;
};

const tokenVerification = async (token) => {
    const data = jwt.verify(token, secretKey);
    if (!data) {
        return undefined;
    } else {
        return data;
    }
};

module.exports = { tokenGeneration, tokenVerification };

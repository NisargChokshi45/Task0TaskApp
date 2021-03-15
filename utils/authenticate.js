const Customer = require("../src/models/customer");
const errorFunction = require("./errorFunction");
const { tokenVerification } = require("./jwtTokens");
require("dotenv").config();

const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_KEY);

const authenticate = async (req, res, next) => {
    try {
        const tokenEncrypted = req.header("Authorization").replace("Bearer ", "");
        const token = cryptr.decrypt(tokenEncrypted);
        const decoded = await tokenVerification(token);
        if (!decoded) {
            res.status(400);
            return res.json(errorFunction(true, "Error in Token"));
        } else {
            const customer = await Customer.findOne({
                _id: decoded._id,
                "tokens.token": tokenEncrypted,
            });
            if (!customer) {
                throw new Error();
            } else {
                req.customer = customer;
                req.token = tokenEncrypted;
                next();
            }
        }
    } catch (error) {
        res.status(400);
        res.json(errorFunction(true, "Authentication Required"));
    }
};

module.exports = authenticate;

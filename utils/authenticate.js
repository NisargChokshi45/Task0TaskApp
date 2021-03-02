const Customer = require("../src/models/customer");
const errorFunction = require("./errorFunction");
const { tokenVerification } = require("./jwtTokens");

const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = await tokenVerification(token);
        if (!decoded) {
            res.status(400);
            return res.json(errorFunction(true, "Error in Token"));
        } else {
            const customer = await Customer.findOne({
                _id: decoded._id,
                "tokens.token": token,
            });
            if (!customer) {
                throw new Error();
            } else {
                req.customer = customer;
                req.token = token;
                next();
            }
        }
    } catch (error) {
        res.status(400);
        res.json(errorFunction(true, "Authentication Required"));
    }
};

module.exports = authenticate;

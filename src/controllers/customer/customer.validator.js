const Joi = require("joi");
const errorFunction = require("../../../utils/errorFunction");

const validation = Joi.object({
    name: Joi.string().required().trim(true),
    email: Joi.string().required().trim(true).lowercase(),
    password: Joi.string().required().min(7).trim(true),
    age: Joi.number().required(),
    items: Joi.array().default([]),
    country: Joi.string().default("India"),
    is_active: Joi.boolean().default(true),
});

const customerValidation = (req, res, next) => {
    const incomingData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        items: req.body.items,
        country: req.body.country,
        is_active: req.body.is_active,
    };

    const { error } = validation.validate(incomingData);
    if (error) {
        res.status(400);
        return res.json(errorFunction(true, "Error in Customer Data", error));
    } else {
        next();
    }
};

module.exports = customerValidation;

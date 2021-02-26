const joi = require("joi");
const errorFunction = require("../../../utils/errorFunction");

const validation = joi.object({
    title: joi.string().trim().required(),
    description: joi.string().trim().required(),
    completed: joi.boolean().default(false),
});

const taskValidation = async (req, res, next) => {
    const incomingData = {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
    };

    const { error } = validation.validate(incomingData);

    if (error) {
        res.status(400);
        return res.json(errorFunction(true, "Error in Task data"));
    } else {
        next();
    }
};

module.exports = taskValidation;

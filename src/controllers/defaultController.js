const errorFunction = require("./../../utils/errorFunction");

const defaultController = (req, res, next) => {
    res.status(200);
    return res.json(errorFunction(false, "Sucess", "Welcome to TaskApp"));
};

module.exports = defaultController;

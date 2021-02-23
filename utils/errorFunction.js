const errorFunction = (error, message, data) => {
    if (error === true) return { is_error: error, message: message };
    else return { is_error: error, message: message, data: data };
};

module.exports = errorFunction;

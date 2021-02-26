const chalk = require("chalk");
const { ObjectID } = require("mongodb");
const errorFunction = require("../../../utils/errorFunction");
const Customer = require("../../models/customer");

const addCustomer = async (req, res, next) => {
    try {
        const existingCustomer = await Customer.findOne({
            email: req.body.email,
        });
        if (existingCustomer) {
            res.status(400);
            return res.json(errorFunction(true, "User Already Exists"));
        } else {
            const newCustomer = await Customer.create(req.body);
            if (newCustomer) {
                res.status(200);
                return res.json(
                    errorFunction(
                        false,
                        "Customer Added Successfully",
                        newCustomer
                    )
                );
            } else {
                res.status(400);
                return res.json(errorFunction(true, "Error Adding User"));
            }
        }
    } catch (error) {
        console.log(chalk.red(error));
    }
};

const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find({ is_active: true }).lean();
        // console.log(customers);
        if (customers) {
            res.status(200);
            return res.json(
                errorFunction(
                    false,
                    "Customers Fetched Successfully",
                    customers
                )
            );
        } else {
            res.status(200);
            return res.json(
                errorFunction(false, "No Customers Found", customers)
            );
        }
    } catch (error) {
        console.log(chalk.red("Error : ", error));
    }
};

const getCustomer = async (req, res, next) => {
    if (req.params.id !== undefined) {
        const customer = await Customer.findById(
            new ObjectID(req.params.id)
        ).lean();
        if (customer) {
            res.status(200);
            return res.json(
                errorFunction(false, "Customer Fetched Successfully", customer)
            );
        } else {
            res.status(500);
            return res.json(
                errorFunction(true, "Customer Not Exists", customer)
            );
        }
    } else {
        res.status(400);
        return res.json(errorFunction(true, "Error in Customer ID "));
    }
};

const updateCustomer = async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "name",
        "email",
        "password",
        "age",
        "is_active",
        "country",
        "items",
    ];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
        return res
            .status(400)
            .json(errorFunction(true, "Can't add New Property"));
    }
    try {
        if (req.params.id !== undefined) {
            const updatedCustomer = await Customer.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (updatedCustomer) {
                res.status(200);
                res.json(
                    errorFunction(
                        false,
                        "Customer Updated sucessfully",
                        updatedCustomer
                    )
                );
            } else {
                res.status(400);
                res.json(
                    errorFunction(true, "Customer ID error", updatedCustomer)
                );
            }
        }
    } catch (error) {
        console.log(chalk.red("Error : ", error));
        res.status(404);
        res.json(errorFunction(true, "Error updating Customer"));
    }
};

const deleteCustomer = async (req, res, next) => {
    try {
        if (req.params.id !== undefined) {
            const deletedCustomer = await Customer.findByIdAndDelete(
                req.params.id
            ).lean();
            if (deletedCustomer) {
                res.status(200);
                res.json(
                    errorFunction(
                        false,
                        "Customer Deleted Successfully",
                        deletedCustomer
                    )
                );
            } else {
                res.status(400);
                res.json(errorFunction(true, "Error Deleting Customer"));
            }
        } else {
            res.status(400);
            res.json(errorFunction(true, "Customer ID not valid"));
        }
    } catch (error) {
        console.log(chalk.red("Error :", error));
    }
};

module.exports = {
    addCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
};

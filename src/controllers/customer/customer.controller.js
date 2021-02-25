const chalk = require("chalk");
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

module.exports = { addCustomer: addCustomer, getAllCustomers: getAllCustomers };

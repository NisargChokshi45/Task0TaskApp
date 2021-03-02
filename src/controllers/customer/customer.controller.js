const chalk = require("chalk");
const { ObjectID } = require("mongodb");
const errorFunction = require("../../../utils/errorFunction");
const Customer = require("../../models/customer");
const { securePassword } = require("./../../../utils/securePassword");

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
            const token = await newCustomer.generateAuthToken();
            if (newCustomer) {
                res.status(200);
                return res.json(
                    errorFunction(false, "Customer Added Successfully", {
                        newCustomer,
                        token,
                    })
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
    try {
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
    } catch (error) {
        res.status(400);
        return res.json(errorFunction(true, "Error Getting Customer"));
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
        // let updatedCustomer = await req.customer;
            // updates.forEach((update) => {
            //     updatedCustomer[update] = req.customer[update];
        // });
        // await request.customer.save();

            const hashedPassword = await securePassword(req.body.password);

            const updatedCustomer = await Customer.findByIdAndUpdate(
                // req.params.id,
                req.customer._id,
                { ...req.body, password: hashedPassword },
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
    catch (error) {
        console.log(chalk.red("Error : ", error));
        res.status(404);
        res.json(errorFunction(true, "Error updating Customer"));
    }
};

const deleteCustomer = async (req, res, next) => {
    try {
       await req.customer.remove();
            res.status(200).json(
                errorFunction(
                    false,
                    "Customer Deleted Successfully",
                    req.customer
                )
            );

            // const deletedCustomer = await Customer.findByIdAndDelete(
            //     // req.params.id
            //     req.customer._id
            // ).lean();
            // if (deletedCustomer) {
            //     res.status(200);
            //     res.json(
            //         errorFunction(
            //             false,
            //             "Customer Deleted Successfully",
            //             deletedCustomer
            //         )
            //     );
            // } else {
            //     res.status(400);
            //     res.json(errorFunction(true, "Error Deleting Customer"));
            // }
    } catch (error) {
        console.log(chalk.red("Error :", error));
    }
};


const customerLogin = async (req, res, next) => {
    try {
        const customer = await Customer.findByCrendentials(
            req.body.email,
            req.body.password
        );
        if (customer) {
            const token = await customer.generateAuthToken();
            res.status(200);
            res.json(
                errorFunction(false, "User logged-in", {
                    // customer: customer.getPublicProfile(),
                    customer,
                    token,
                })
            );
        }
    } catch (error) {
        console.log(chalk.red("Error : ", error));
        res.status(400);
        res.json(errorFunction(true, "Login Failed"));
    }
};

const customerProfile = async (req, res, next) => {
    try {
        res.status(201);
        return res.json(
            errorFunction(false, "Fetched Customer Profile", req.customer)
        );
    } catch (error) {
        console.log("Error : ", error);
        res.status(400);
        return res.json(errorFunction(true, "Error showing Customer Profile"));
    }
};

const customerLogout = async (req, res, next) => {
    console.log("logout called");
    try {
        req.customer.tokens = req.customer.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.customer.save();
        res.status(200);
        res.json(errorFunction(false, "Customer Logged-out", undefined));
    } catch (error) {
        res.status(400);
        console.log("Error : ", error);
        return res.json(errorFunction(true, "Error Logging out Customer "));
    }
};

const customerLogoutFromAllDevices = async (req, res, next) => {
    try {
        req.customer.tokens = [];
        await req.customer.save();
        res.status(200);
        return res.json(
            errorFunction(
                false,
                "Customer Logged out from All Devices",
                undefined
            )
        );
    } catch (error) {
        console.log("Error : ", error);
        res.status(400);
        return res.json(errorFunction(true, "Error Loggin out "));
    }
};

module.exports = {
    addCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    customerLogin,
    customerLogout,
    customerLogoutFromAllDevices,
    customerProfile,
};

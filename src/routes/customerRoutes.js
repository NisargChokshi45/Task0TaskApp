const express = require("express");
const {
    addCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    customerLogin,
} = require("./../controllers/customer/customer.controller");
const customerValidation = require("./../controllers/customer/customer.validator");

const customerRoutes = express.Router();

customerRoutes.post("/login", customerLogin);
customerRoutes.get("/customers", getAllCustomers);
customerRoutes.get("/customers/:id", getCustomer);
customerRoutes.post("/addCustomer", customerValidation, addCustomer);
customerRoutes.post("/updateCustomer/:id", customerValidation, updateCustomer);
customerRoutes.post("/deleteCustomer/:id", deleteCustomer);

module.exports = customerRoutes;

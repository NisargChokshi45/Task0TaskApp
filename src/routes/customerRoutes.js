const express = require("express");
const {
    addCustomer,
    getAllCustomers,
} = require("./../controllers/customer/customer.controller");
const customerValidation = require("./../controllers/customer/customer.validator");

const customerRoutes = express.Router();

customerRoutes.get("/customers", getAllCustomers);
// customerRoutes.get("/customer", getCustomer);
customerRoutes.post("/addCustomer", customerValidation, addCustomer);
// customerRoutes.post("/updateCustomer", customerValidation, updateCustomer);
// customerRoutes.post("/deleteCustomer", customerValidation, deleteCustomer);

module.exports = customerRoutes;

const express = require("express");
const {
    addCustomer,
    // getAllCustomers,
    // getCustomer,
    updateCustomer,
    deleteCustomer,
    customerLogin,
    customerLogout,
    customerLogoutFromAllDevices,
    customerProfile,
} = require("./../controllers/customer/customer.controller");
const customerValidation = require("./../controllers/customer/customer.validator");
const authenticate = require("../../utils/authenticate");

const customerRoutes = express.Router();

customerRoutes.post("/login", customerLogin);
customerRoutes.post("/logout", authenticate, customerLogout);
customerRoutes.post("/logoutFromAll", authenticate, customerLogoutFromAllDevices);
customerRoutes.get("/profile", authenticate, customerProfile);
// customerRoutes.get("/customers", authenticate, getAllCustomers);
// customerRoutes.get("/customers/:id", getCustomer);
customerRoutes.post("/addCustomer", customerValidation, addCustomer);
customerRoutes.post(
    "/updateCustomer",
    authenticate,
    customerValidation,
    updateCustomer
);
// customerRoutes.post("/deleteCustomer/:id", authenticate, deleteCustomer);
customerRoutes.post("/deleteCustomer", authenticate, deleteCustomer);
customerRoutes.delete("/profile", authenticate, deleteCustomer);

module.exports = customerRoutes;

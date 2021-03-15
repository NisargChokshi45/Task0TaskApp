const express = require("express");
const {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    customerLogin,
    customerLogout,
    customerLogoutFromAllDevices,
    customerProfile,
    customerProfilePicUpload,
    deleteCustomerProfilePic,
    getCustomerProfilePic,
    errorHandler,
    customerForgotPassword,
    forgotPassword,
    resetPassword
    // getAllCustomers,
    // getCustomer,
} = require("./../controllers/customer/customer.controller");
const customerValidation = require("./../controllers/customer/customer.validator");
const authenticate = require("../../utils/authenticate");

const multer = require("multer");

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please Upload an Image"));
        }
        cb(undefined, true);
    },
});

const customerRoutes = express.Router();

customerRoutes.post("/login", customerLogin);
customerRoutes.post("/forgotPassword", customerForgotPassword);
customerRoutes.post("/forgotCustomerPassword", forgotPassword);

customerRoutes.post("/resetPassword", resetPassword);

customerRoutes.post(
    "/profile/avatar",
    authenticate,
    upload.single("avatar"),
    customerProfilePicUpload,
    errorHandler
);
customerRoutes.delete(
    "/profile/avatar",
    authenticate,
    deleteCustomerProfilePic
);
customerRoutes.get("/customer/:id/profilePic", getCustomerProfilePic);
customerRoutes.post("/logout", authenticate, customerLogout);
customerRoutes.post(
    "/logoutFromAll",
    authenticate,
    customerLogoutFromAllDevices
);
customerRoutes.get("/profile", authenticate, customerProfile);
customerRoutes.post("/addCustomer", customerValidation, addCustomer);
customerRoutes.post(
    "/updateCustomer",
    authenticate,
    customerValidation,
    updateCustomer
);
customerRoutes.post("/deleteCustomer", authenticate, deleteCustomer);
customerRoutes.delete("/profile", authenticate, deleteCustomer);
// customerRoutes.get("/customers/:id", getCustomer);
// customerRoutes.get("/customers", authenticate, getAllCustomers);
// customerRoutes.post("/deleteCustomer/:id", authenticate, deleteCustomer);

module.exports = customerRoutes;

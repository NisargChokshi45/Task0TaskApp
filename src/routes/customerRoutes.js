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
    customerProfilePicUpload,
    deleteCustomerProfilePic,
    getCustomerProfilePic,
    errorHandler,
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
customerRoutes.get(
    "/customer/:id/profilePic",
    // authenticate,
    getCustomerProfilePic
);
customerRoutes.post("/logout", authenticate, customerLogout);
customerRoutes.post(
    "/logoutFromAll",
    authenticate,
    customerLogoutFromAllDevices
);
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

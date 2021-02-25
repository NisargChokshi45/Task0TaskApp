const express = require("express");
const addCustomer = require("../controllers/customer/customer.controller");
const customerValidation = require("../controllers/customer/customer.validator");
const defaultController = require("./../controllers/defaultController");
const customerRoutes = require("./customerRoutes");
const taskRoutes = require("./taskRoutes");

const router = express.Router();

router.get("/", defaultController);

router.use("/api", customerRoutes);
router.use("/api", taskRoutes);

module.exports = router;

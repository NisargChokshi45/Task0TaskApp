const validator = require("validator");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is Invalid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLegnth: 7,
        trim: true,
        validate(value) {
            if (value.includes("password")) {
                throw new Error("Passoword should not contain Password");
            }
        },
    },
    age: { type: Number, required: true },
    items: { type: Array, default: [] },
    country: { type: String, default: "India" },
    is_active: { type: Boolean, default: true },
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;

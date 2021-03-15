const validator = require("validator");
const mongoose = require("mongoose");
const {
    securePassword,
    matchPassword,
} = require("./../../utils/securePassword");
const { tokenGeneration } = require("../../utils/jwtTokens");
const Task = require("./task");
require("dotenv").config();
const errorFunction = require("../../utils/errorFunction");

const secretKey = process.env.SECRET_KEY;
const Cryptr = require('cryptr');
const cryptr = new Cryptr(secretKey);

const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
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
        avatar: {
            type: Buffer,
        },
        tokens: [
            {
                token: { type: String, required: true },
            },
        ],
    },
    { timestamps: true }
);

customerSchema.virtual("tasks", {
    ref: "task",
    localField: "_id",
    foreignField: "ownerId",
});


// Creating Static Methods  (Model Methods) - That can be called on Model
customerSchema.statics.findByCrendentials = async (
    loginEmail,
    loginPassword
) => {
    const customer = await Customer.findOne({ email: loginEmail });
    if (!customer) {
        throw new Error("Unable to Login");
    }

    const isMatch = await matchPassword(loginPassword, customer.password);
    if (!isMatch) {
        throw new Error("Unable to Login");
    }
    return customer;
};

// Creating Instance Methods - That can be called on Model Instances
customerSchema.methods.generateAuthToken = async function () {
    const customer = this;
    const tokenOriginal = await tokenGeneration({ _id: customer._id.toString() });
    const token = cryptr.encrypt(tokenOriginal);
    customer.tokens = customer.tokens.concat({ token: token });
    await customer.save();
    return token;
};

// Alternate way to hide Private Information of Customer
customerSchema.methods.toJSON = function (){
    const customer = this;
    const customerObject = customer.toObject();
    delete customerObject.password;
    delete customerObject.tokens;
    delete customerObject.avatar;
    return customerObject;
}

// Creating an Instance method to hide the Private information of Customer
// customerSchema.methods.getPublicProfile = function() {
//     console.log("Get profile called");
//     const customer = this;
//     const customerObject = customer.toObject();
//     delete customerObject.password;
//     delete customerObject.tokens;
//     return customerObject;
//  }

customerSchema.pre("remove", async function (next) {
    const customer = this;
    const deletedTasks = await Task.deleteMany({ ownerId: customer._id });
    next();
});


// Do not Use Arrow Function, as we need to Perform BINDING of the current user
customerSchema.pre("save", async function (next) {
    const customer = this;
    // console.log("Line just before Customer Saving");
    if (customer.isModified("password")) {
        customer.password = await securePassword(customer.password);
    }
    next();
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;

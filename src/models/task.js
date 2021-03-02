const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "customer",
    },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;

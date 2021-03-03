const chalk = require("chalk");
const errorFunction = require("../../../utils/errorFunction");
const { ObjectID } = require("mongodb");
const Task = require("./../../models/task");

const addTask = async (req, res, next) => {
    try {
        const taskExists = await Task.findOne({ title: req.body.title });
        if (taskExists) {
            res.status(400);
            return res.json(errorFunction(true, "Task Already Exists"));
        } else {
            const newTask = await Task.create({
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed,
                ownerId: req.customer._id,
            });
            if (newTask) {
                res.status(200);
                return res.json(
                    errorFunction(false, "Task Added Successfully", newTask)
                );
            } else {
                res.status(400);
                return res.json(errorFunction(true, "Error Adding Task"));
            }
        }
    } catch (error) {
        console.log(chalk.red("Error : ", error));
    }
};


// GET - /tasks?completed=true 
// GET - /tasks?completed=false
const getAllTasks = async (req, res, next) => {
    const match = {};
    const sort = {};
    try {
        console.log("Getting tasks");
        if (req.query.completed)
            match.completed = req.query.completed === "true";

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(":");
            sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
        }

        const customerTasks = await req.customer
            .populate({
                path: "tasks",
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort
                }
            })
            .execPopulate();

        if (customerTasks) {
            res.status(200);
            return res.json(
                errorFunction(
                    false,
                    "Tasks fetched Successfully",
                    req.customer.tasks
                )
            
            );
        }
    } catch (error) {
        console.log(chalk.red("Error : ", error));
                    res.status(400).json(
                        errorFunction(true, "Error Getting Tasks")
                    );
    }
};

const getTask = async (req, res, next) => {
    try {
        if (req.params.id !== undefined) {
            const task = await Task.findOne({
                _id: new ObjectID(req.params.id),
                ownerId: req.customer._id,
            });
            if (task) {
                res.status(200);
                res.json(
                    errorFunction(false, "Fetched Task Successfully", task)
                );
            } else {
                res.status(400);
                res.json(errorFunction(true, "Task Not Exists"));
            }
        } else {
            res.status(404);
            res.json(errorFunction(true, "Error in Task ID"));
        }
    } catch (error) {
        console.log(chalk.red("Error ", error));
        return res.status(500).json(errorFunction(true, "Error finding Task"));
    }
};

const updateTask = async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description", "completed"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).json(errorFunction(true, "Invalid Task Data"));
    }

    try {
        if (req.params.id !== undefined) {
            const updatedTask = await Task.findByIdAndUpdate(
                { _id: req.params.id, ownerId: req.customer._id },
                req.body,
                {
                    new: true,
                }
            );
            if (updatedTask) {
                res.status(200);
                return res.json(
                    errorFunction(
                        false,
                        "Task Updated Successfully",
                        updatedTask
                    )
                );
            } else {
                res.status(400);
                return res.json(
                    errorFunction(true, "Task Not Updated", updatedTask)
                );
            }
        } else {
            res.status(400);
            return res.json(errorFunction(true, "Error in Task ID"));
        }
    } catch (error) {
        res.status(400);
        return res.json(errorFunction(true, "Error updating Task", error));
    }
};

const deleteTask = async (req, res, next) => {
    try {
        console.log("Deleting Task");
        if (req.params.id !== undefined) {
            const deletedTask = await Task.findOneAndDelete({
                _id: req.params.id,
                ownerId: req.customer._id,
            });
            if (deletedTask) {
                res.status(200);
                res.json(
                    errorFunction(
                        false,
                        "Deleted Task Successfully",
                        deletedTask
                    )
                );
            } else {
                res.status(400);
                res.json(errorFunction(true, "Task not found"));
            }
        } else {
            res.status(400);
            res.json(errorFunction(true, "Task ID not valid"));
        }
    } catch (error) {
        console.log(chalk.red("Error :", error));
        res.status(400);
        res.json(errorFunction(true, "Task "));
    }
};

module.exports = { addTask, getAllTasks, getTask, updateTask, deleteTask };

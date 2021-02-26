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

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find().lean();
        if (tasks) {
            res.status(200);
            return res.json(
                errorFunction(false, "Tasks Fetched Successfully", tasks)
            );
        } else {
            res.status(200);
            return res.json(errorFunction(false, "No Tasks Found", tasks));
        }
    } catch (error) {
        console.log(chalk.red("Error : ", error));
    }
};

const getTask = async (req, res, next) => {
    try {
        if (req.params.id !== undefined) {
            const task = await Task.findById(new ObjectID(req.params.id));
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
    try {
        if (req.params.id !== undefined) {
            const updatedTask = await Task.findByIdAndUpdate(
                req.params.id,
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
            const deletedTask = await Task.findByIdAndDelete(req.params.id);
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

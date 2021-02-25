const chalk = require("chalk");
const errorFunction = require("../../../utils/errorFunction");
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
        const tasks = await Task.find({ completed: false }).lean();
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

module.exports = { addTask: addTask, getAllTasks: getAllTasks };

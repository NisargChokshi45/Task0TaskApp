const express = require("express");
const taskValidation = require("../controllers/task/task.validator");
const {
    addTask,
    getAllTasks,
} = require("./../controllers/task/task.controller");

const taskRoutes = express.Router();

taskRoutes.get("/tasks", getAllTasks);
// taskRoutes.get("/task", getTask);
taskRoutes.post("/addTask", taskValidation, addTask);
// taskRoutes.post("/updateTask", taskValidation, updateTask);
// taskRoutes.post("/deleteTask", taskValidation, deleteTask);

module.exports = taskRoutes;

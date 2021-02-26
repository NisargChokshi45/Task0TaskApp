const express = require("express");
const taskValidation = require("../controllers/task/task.validator");
const {
    addTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
} = require("./../controllers/task/task.controller");

const taskRoutes = express.Router();

taskRoutes.get("/tasks", getAllTasks);
taskRoutes.get("/task/:id", getTask);
taskRoutes.post("/addTask", taskValidation, addTask);
taskRoutes.post("/updateTask/:id", taskValidation, updateTask);
taskRoutes.post("/deleteTask/:id", deleteTask);

module.exports = taskRoutes;

const express = require("express");
const taskValidation = require("../controllers/task/task.validator");
const {
    addTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
} = require("./../controllers/task/task.controller");
const authenticate = require("./../../utils/authenticate");

const taskRoutes = express.Router();

taskRoutes.get("/tasks", authenticate, getAllTasks);
taskRoutes.get("/task/:id", authenticate, getTask);
taskRoutes.post("/addTask", authenticate, taskValidation, addTask);
taskRoutes.post("/updateTask/:id", authenticate, taskValidation, updateTask);
taskRoutes.post("/deleteTask/:id", authenticate, deleteTask);

module.exports = taskRoutes;

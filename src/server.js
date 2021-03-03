require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const { urlencoded } = require("body-parser");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
// const Customer = require("./models/customer");
// const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

// Without Middlewares  -  New Request  ->  Route Handler runs
//  With Middlewares      -  New Request  ->  Performs some task  -> Route Handler runs
// Creating a Maintenance Middleware
// app.use((req, res, next) => {
//     res.status(503);
//     return res.send("Maintenance Timeout ! Website is currently Down ! ");
// })

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(morgan("dev"));

const start = async () => {
    try {
        await mongoose.connect(
            dbUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            },
            (error) => {
                if (error) {
                    console.log(chalk.red("Error Connecting to DB !"));
                } else {
                    // sample();
                    app.listen(port, (error) => {
                        if (error) {
                            console.log(
                                chalk.bgRed.black("Error Running App ")
                            );
                        }
                        console.log(
                            chalk.bgGreen.black(
                                `Server Started on Port ${port} `
                            )
                        );
                        app.use("/", routes);
                    });
                }
            }
        );
    } catch (error) {
        console.log(chalk.red(error));
    }
};

// const sample = async () => {
//     const task = await Task.findById("603df8ecd1fbf9348455cf4a");
//     console.log("Task : ", task);
//     const taskOwner = await task.populate("ownerId").execPopulate();
//     console.log("Task Owner Details : ", taskOwner);
//     // const customer = await Customer.findById("603df85dd1fbf9348455cf48");
//     // console.log("Customer :", customer);
//     // const customerTasks = await customer.populate("tasks").execPopulate();
//     // console.log("Customer Tasks :", customer.tasks);
// };

start();

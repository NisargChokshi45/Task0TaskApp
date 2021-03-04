require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const { urlencoded } = require("body-parser");
const routes = require("./routes/routes");
const mongoose = require("mongoose");

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
                    app.listen(port, (error) => {
                        if (error) {
                            console.log(
                                chalk.bgRed.black(
                                    "Error Running the Application"
                                )
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

start();

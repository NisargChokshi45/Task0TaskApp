const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const { urlencoded } = require("body-parser");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const log = console.log;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(morgan("dev"));

const start = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (error) => {
                if (error) {
                    log(chalk.red("Error Connecting to DB !"));
                } else {
                    app.listen(port, (error) => {
                        if (error) {
                            log(chalk.bgRed.black("Error Running App "));
                        }
                        log(chalk.bgGreen(`Server Started on Port ${port} `));
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

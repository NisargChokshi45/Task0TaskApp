const chalk = require("chalk");

const addManyDocuments = async (db, collectionName) => {
    try {
        await db.collection(collectionName).insertMany(
            [
                {
                    name: "Kemil Don",
                    email: "kemil33@gmail.com",
                    age: 23,
                    country: "UK",
                },
                {
                    name: "Kyle Hemson",
                    email: "hyle78ye@gmail.com",
                    age: 23,
                    country: "Canada",
                },
            ],
            (error, result) => {
                if (error) {
                    return console.log(
                        chalk.bgRed.black(
                            "Error Inserting Multiple User : ",
                            error
                        )
                    );
                } else console.log(chalk.green(JSON.stringify(result.ops)));
            }
        );
    } catch (error) {
        console.log(chalk.bgRed.black("Error : ", error));
    }
};

module.exports = addManyDocuments;

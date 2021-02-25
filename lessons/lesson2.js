const chalk = require("chalk");

const addOneDocument = async (db, collectionName, data) => {
    try {
        await db.collection(collectionName).insertOne(data, (error, result) => {
            if (error)
                return console.log(
                    chalk.bgRed.black("Error Inserting User :", error)
                );
            else console.log(chalk.green(JSON.stringify(result.ops[0])));
        });
    } catch (error) {
        console.log(chalk.bgRed.black("Error Occured :", error));
    }
};

module.exports = addOneDocument;

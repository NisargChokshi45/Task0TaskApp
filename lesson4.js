const chalk = require("chalk");

const find = (db, collectionName, searchQuery) => {
    db.collection(collectionName)
        .find(searchQuery)
        .toArray((error, users) => {
            if (error) {
                console.log(chalk.bgRed(error));
            } else console.log(chalk.green(JSON.stringify(users)));
        });
    db.collection(collectionName)
        .find(searchQuery)
        .count((error, userCount) => {
            if (error) {
                console.log(chalk.bgRed(error));
            } else console.log(chalk.green(userCount));
        });
};

const findDocumentByName = (db, collectionName, name) => {
    const user = db
        .collection(collectionName)
        .findOne({ name: name }, (error, user) => {
            if (error) {
                return console.log(chalk.bgRed.black("Error Finding User"));
            } else {
                return console.log(chalk.green(JSON.stringify(user)));
            }
        });
};

module.exports = { find, findDocumentByName };

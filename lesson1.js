const { MongoClient, ObjectID } = require("mongodb");
const chalk = require("chalk");
const dotenv = require("dotenv");
const addOneDocument = require("./lesson2");
const addManyDocuments = require("./lesson3");
const { find, findDocumentByName } = require("./lesson4");
const updateOneDocument = require("./lesson5");
const deleteDocument = require("./lesson6");
dotenv.config();

const connectionUrl = process.env.MONGO_URL;
const databaseName = process.env.DATABASE;

const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id.length);

const data1 = {
    name: "Kemil Don",
    email: "kemil33@gmail.com",
    age: 23,
    country: "UK",
};
const data2 = {
    name: "Kyle Hemson",
    email: "hyle78ye@gmail.com",
    age: 23,
    country: "Canada",
};

const multipleData = [data1, data2];

const dbConnect = async () => {
    try {
        await MongoClient.connect(
            connectionUrl,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (error, client) => {
                if (error) {
                    console.log(chalk.bgRed.black("Unable to Connect to DB :"));
                    return console.log("Error : ", error);
                } else {
                    console.log(
                        chalk.bgGreen.black("Connected to DB Successfully !")
                    );
                    const db = client.db(databaseName);
                    // addOneDocument(db, "Users", data1);
                    // addManyDocuments(db, "Users");
                    //  find(db, "Users", { _id: new ObjectID("6034ca3614eaa02060672812") });
                    // updateOneDocument( db, "Users",{ country: "Australia" }, { country: "Canada" });
                    // findDocumentByName(db, "Users", "Jeniffer Taylor");
                    deleteDocument(db, "Users", { country: "India" });
                }
            }
        );
    } catch (error) {
        console.log(chalk.bgRed.black(error));
    }
};

dbConnect();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    items: Array,
});

const Customer = mongoose.model("Customer", customerSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    const johnDoe = new Customer({
        name: "John Doe",
        age: 45,
        items: ["Pen", "Pencil", "Diary"],
    });
    johnDoe
        .save()
        .then(() => {
            console.log(johnDoe);
        })
        .catch((error) => {
            console.log(error);
        });
});

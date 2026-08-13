require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});

const Person = mongoose.model("Person", personSchema);

const name = process.argv[2];
const number = process.argv[3];

const person = new Person({
  name,
  number,
});

person.save().then(() => {
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close();
});
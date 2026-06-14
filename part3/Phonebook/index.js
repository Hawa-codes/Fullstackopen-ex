const express = require("express");

const app = express();
app.use(express.json());

//Phone book backend step 1
const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get("/api/persons", (req, res) => {
    res.status(200).json(persons)
})

//Phone book backend step 2
app.get("/info", (req, res) => {
    const count = persons.length;
    const time = new Date();
    res.status(200).send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${time}</p>
    `);
})

//Phone book backend step 3
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find((p) => p.id === id);
    if (!person) {
        return res.status(404).send(`Person not found`)
    }
    return res.status(200).json(person);
})

// Phone book backend step 4
app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const personIndex = persons.findIndex((p) => p.id === id);
    if (personIndex === -1) {
        return res.status(404).json({
        message: "Person not found",
        error: true,
        });
    }

    const deletedPerson = persons.splice(personIndex, 1);
    return res.status(204).json({
        message: "Person deleted successfully",
        data: deletedPerson[0],
    });
})

// Phone book backend step 5
app.post("/api/person", (req, res) => {
    const { name, number } = req.body;
    const person = { id: Math.floor(Math.random() * 10), name, number};
    persons.push(person);
    res.status(201).json({
        message: "user created successfully",
        person,
    })
})

// Phone book backend step 6
app.post("/api/persons", (req, res) => {
    const { name, number } =req.body;
    if( !name || !number) {
        return res.status(400).json({
        error: "name or number is missing",
        });
    }
    const existingPerson = persons.find((p) => p.name === name);

    if (existingPerson) {
        return res.status(400).json({
        error: "name must be unique",
        });
    }
})


app.listen(3001, () => {
    console.log("Server run on port 3001")
})
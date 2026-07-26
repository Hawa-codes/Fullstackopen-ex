const express = require("express");
const cors = require('cors');
const morgan = require('morgan')

// Exercises 3.7.-3.8.
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

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
// app.post("/api/person", (req, res) => {
//     const { name, number } = req.body;
//     const person = { id: Math.floor(Math.random() * 30), name, number};
//     persons.push(person);
//     res.status(201).json({
//         message: "user created successfully",
//         person,
//     })
// })

const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
    return String(maxId + 1)
}

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
    const person = {
        id: generateId(),
        name,
        number
    };

    persons.push(person);

    res.status(201).json(person);
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
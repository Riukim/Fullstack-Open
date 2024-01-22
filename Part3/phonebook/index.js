require('dotenv').config({path: './mongodb_uri.env'})

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')
const Person = require('./models/person');

app.use(express.static('dist'))
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  } 

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token("content", function getContent(req) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :content")
);
app.use(express.json());

/* let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Gino Gini",
    number: "39-23-6423122",
  },
]; */

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then(numPersons => {
      res.send(`<p>Phonebook has info for ${numPersons} people!</p>
      <p>${Date()}</p>`);
    })
    .catch(error => next(error))

});

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
});

/* const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000000);

  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

  return Math.max(maxId, randomId) + 1;
} */;

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

/*   const samePerson = Person.find((person) => person.name === body.name);

  if (samePerson) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } */

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
    response.json(savedPerson)
    })
    .catch(error => next(error))
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => next(error))
});

app.put("/api/persons/:id", (request, response, next) => {
  
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    { name, number }, 
    {new: true, runValidators: true, context: 'query'}
  )
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
}) 

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

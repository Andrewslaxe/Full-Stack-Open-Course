const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

var Personslength = 0
const Person = require("../models/person")
const PORT = process.env.PORT

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" })
}
const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

morgan.token("body", (request) => {
	return JSON.stringify(request.body)
})

app.use(express.json())
app.use(cors())
app.use(express.static("build"))
app.use(
	morgan(
		"Method :method - URL :url - Status :status - Response length :res[content-length] - Response time :response-time ms - :body"
	)
)

app.get("/", (request, response) => {
	response.send("<h1>Hello this is the backend of the Phonebook!</h1>")
})
app.get("/api/persons", (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons)
		Personslength = persons.length
	})
})
app.get("/info", (request, response) => {
	const date = new Date().toUTCString()
	const numberOfPersons = Personslength
	response.send(
		`<p>Phonebook has info for ${numberOfPersons} people</p><p>${date}</p>`
	)
})
app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person.length === 0) {
				response.status(404).end()
			} else {
				response.json(person)
			}
		})
		.catch((error) => {
			next(error)
		})
})
app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body
	const person = {
		name: body.name,
		number: body.number,
	}
	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson)
		})
		.catch((error) => next(error))
})
app.post("/api/persons", (request, response) => {
	const body = request.body
	if (body.name === undefined) {
		return response.status(400).json({ error: "name missing" })
	} else if (body.number === undefined) {
		return response.status(400).json({ error: "number missing" })
	}
	const person = new Person({
		name: body.name,
		number: body.number,
	})
	person.save().then((savedPerson) => {
		response.json(savedPerson)
	})
})
app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
})

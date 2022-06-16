import React, { useState } from "react"
import Contacts from "./services/Contacts"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const Filter = ({ filter, handlefilterChange }) => {
	return (
		<div>
			filter shown with: <input value={filter} onChange={handlefilterChange} />
		</div>
	)
}
const Notification = ({ message, Status }) => {
	const failStyle = {
		color: "red",
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	}
	const succesStyle = {
		color: "green",
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	}
	if (message === null) {
		return null
	} else if (Status === "success") {
		return <div style={succesStyle}>{message}</div>
	} else if (Status === "fail") {
		return <div style={failStyle}>{message}</div>
	}
}

const App = () => {
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [filter, setFilter] = useState("")
	const [persons, setPersons] = useState([])
	const [Alertmessage, setAlertMessage] = useState(null)
	const [Status, setStatus] = useState("")

	if (persons.length === 0) {
		Contacts.getAll().then((response) => {
			setPersons(response)
		})
	}
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	)
	const Uploadnumber = (personObject) => {
		if (
			window.confirm(
				`${personObject.name} is already added to phonebook, replace the old number with a new one?`
			)
		) {
			Contacts.update(personObject)
				.then((response) => {
					setAlertMessage(`${personObject.name} number updated`)
					setStatus("success")
				})
				.catch((error) => {
					setAlertMessage(
						`Information of ${personObject.name} has already been removed from server`
					)
					setStatus("fail")
				})
			setNewName("")
			setNewNumber("")
			setTimeout(() => {
				setAlertMessage(null)
			}, 5000)
		}
	}
	const addName = (event) => {
		event.preventDefault()
		var personObject
		personObject = persons.find((person) => person.name === newName)
		if (personObject !== undefined) {
			personObject.number = newNumber
			Uploadnumber(personObject)
		} else {
			personObject = {
				name: newName,
				number: newNumber,
			}
			Contacts.create(personObject)
				.then((response) => {
					setPersons(persons.concat(response))
					setAlertMessage(`${newName} added to phonebook`)
					setStatus("success")
				})
				.catch((error) => {
					setAlertMessage(`Error to create ${personObject.name} in server`)
					setStatus("fail")
				})
			setTimeout(() => {
				setAlertMessage(null)
			}, 5000)
			setNewName("")
			setNewNumber("")
		}
	}
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const handlefilterChange = (event) => {
		setFilter(event.target.value)
	}
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={Alertmessage} Status={Status} />
			<Filter filter={filter} handlefilterChange={handlefilterChange} />
			<h3>Add a new</h3>
			<PersonForm
				addName={addName}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons
				filteredPersons={filteredPersons}
				setPersons={setPersons}
				persons={persons}
				setAlertMessage={setAlertMessage}
				setStatus={setStatus}
			/>
		</div>
	)
}

export default App

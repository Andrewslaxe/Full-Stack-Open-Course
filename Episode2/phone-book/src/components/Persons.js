import React from "react"
import Contacts from "../services/Contacts"

const Persons = ({
	filteredPersons,
	setPersons,
	persons,
	setAlertMessage,
	setStatus,
}) => {
	const handleClick = (person) => {
		return () => {
			if (window.confirm(`Delete ${person.name}?`)) {
				Contacts.deletePerson(person.id)
					.then((Response) => {
						setPersons(persons.filter((n) => n.id !== person.id))
						setAlertMessage(`${person.name} deleted`)
						setStatus("success")
					})
					.catch((error) => {
						setAlertMessage(`${person.name} can't be deleted`)
						setStatus("fail")
					})
				setTimeout(() => {
					setAlertMessage(null)
				}, 5000)
			}
		}
	}
	return (
		<ul>
			{filteredPersons.map((person) => (
				<li key={person.name}>
					{person.name} {person.number}{" "}
					<button onClick={handleClick(person)}>Delete</button>
				</li>
			))}
		</ul>
	)
}
export default Persons

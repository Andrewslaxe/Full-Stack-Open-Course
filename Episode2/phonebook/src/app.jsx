import { useEffect, useState } from 'react'

import { AddContact } from './controllers/AddContact'
import { FilterContact } from './controllers/FilterContact'
import { ShowPersons } from './controllers/ShowPersons'
import { Notification } from './controllers/Notification'

import contact from './services/Contact'

export const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [notification, setNotification] = useState({ type: '', message: '', time: 0 })

  useEffect(() => {
    contact.getAll().then(response => setPersons(response))
  }, [])

  return (
    <div className='app'>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <FilterContact setFilter={setFilter} setPersonsToShow={setPersonsToShow} persons={persons} />
      <AddContact persons={persons} setPersons={setPersons} setNotification={setNotification} />
      <div className='numbers'>
        <h2>Numbers</h2>
        {filter === '' ? (<ShowPersons persons={persons} setPersons={setPersons} setNotification={setNotification} />) : <ShowPersons persons={personsToShow} setPersons={setPersons} setNotification={setNotification} />}
      </div>
    </div>
  )
}

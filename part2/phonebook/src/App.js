import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({filterWord, handleChange}) => (
  <p>
    filter shown with <input name="filter" value={filterWord} onChange={handleChange}/>
  </p>
)

const PersonForm = ({addName, newName, newNumber, handleChange}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input name="name" value={newName} onChange={handleChange}/>
      </div>
      <div>
        number: <input name="number" value={newNumber} onChange={handleChange}/>
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  )
}

const Persons = ({filterWord, persons}) => {
  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(filterWord)
  )

  return filterWord === '' ? 
    persons.map(person => <Person key={person.id} name={person.name} number={person.number} />) :  
    filtered.map(person => <Person key={person.id} name={person.name} number={person.number} />)
}

const Person = ({name, number}) => <p>{name} {number}</p>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  function handleChange(event) {
    if (event.target.name === "name") 
      setNewName(event.target.value)
    if (event.target.name === "number")
      setNewNumber(event.target.value)
    if (event.target.name === "filter")
      setFilterWord(event.target.value)
  }

  function addName(event) {
    event.preventDefault()
    let nameAlreadyExists = false
    persons.forEach(person => {
      if (person.name === newName) {
        nameAlreadyExists = true
      }
    })
    if (nameAlreadyExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWord={filterWord} handleChange={handleChange}/>

      <h3>Add new record</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleChange={handleChange}/>

      <h3>Numbers</h3>
      <Persons filterWord={filterWord} persons={persons} />
    </div>
  )
}

export default App
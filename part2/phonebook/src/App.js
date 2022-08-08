import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

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

  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(filterWord)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input name="filter" value={filterWord} onChange={handleChange}/></p>
      <h2>Add new record</h2>
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
      <h2>Numbers</h2>
      {filterWord === '' ? 
        persons.map(person => <p key={person.id}>{person.name} {person.number}</p>) :  
        filtered.map(person => <p key={person.id}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App
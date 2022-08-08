import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function handleChange(event) {
    if (event.target.name === "name") 
      setNewName(event.target.value)
    if (event.target.name === "number")
      setNewNumber(event.target.value)
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
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
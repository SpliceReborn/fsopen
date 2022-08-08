import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  function handleNameChange(event) {
    setNewName(event.target.value)
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
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App
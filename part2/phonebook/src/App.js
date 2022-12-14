import { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Persons = ({filterWord, persons, handleDelete}) => {
  const filtered = persons.filter(person =>
    person.name.toLowerCase().includes(filterWord)
  )

  let copy = []
  filterWord === '' ? copy = [...persons] : copy = [...filtered]

  return copy.map(person => 
    <Person 
      key={person.id} 
      name={person.name} 
      number={person.number} 
      onDelete={() => handleDelete(person.id)}
    />) 
}

const Person = ({name, number, onDelete}) => {
  function handleClick() {
    if (window.confirm(`Delete ${name}?`))
      onDelete()
  }
  
  return (
    <p>{name} {number} <button onClick={handleClick}>delete</button></p>
  )
}

const Notification = ({message}) => {
  const success = message.type==="successful"
  const style = {
    width: "100%",
    fontSize: 20,
    borderStyle: "solid",
    borderWidth: "3px",
    background: "lightgrey",
    padding: "10px",
    color: `${success ? "green" : "red"}`,
    borderColor: `${success ? "green" : "red"}`
  }
  return (
    <div style={style}>
      {message.content}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [message, setMessage] = useState({
    content: "",
    type: ""
  })

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  function handleChange(event) {
    if (event.target.name === "name") 
      setNewName(event.target.value)
    if (event.target.name === "number")
      setNewNumber(event.target.value)
    if (event.target.name === "filter")
      setFilterWord(event.target.value)
  }

  function replaceName() {
    const personToUpdate = persons.filter(p => p.name.toLowerCase() === newName.toLowerCase())[0]
    personToUpdate.number = newNumber
    personService
      .update(personToUpdate.id, personToUpdate)
      .then(updatedPerson => {
        setPersons(persons.map(p => p.id === personToUpdate.id ? updatedPerson : p))
      })
      .catch(() => {
        setMessage({
          content: `Information of ${newName} has already been removed from server`, 
          type: 'error'
        })
        setTimeout(() => setMessage({content: "", type: ""}), 3000)
        setPersons(persons.filter(p => p.id !== personToUpdate.id))
      })
    setMessage({
      content: `Number for ${newName} replaced to ${newNumber}`,
      type: 'successful'
    })
    setTimeout(() => setMessage({content: "", type: ""}), 3000)
  }

  function addName(event) {
    event.preventDefault()
    let nameExists = !!persons.find(p => 
                        p.name.toLowerCase() === newName.toLowerCase()
                      )
    if(nameExists) {
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replace) replaceName()
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .add(newPerson)
        .then(person => setPersons(persons.concat(person)))
      setMessage({
        content: `Added ${newName}`,
        type: 'successful'
      })
      setTimeout(() => setMessage({content: "", type: ""}), 3000)
      setNewName('')
      setNewNumber('')
    }
  }

  function handleDelete(id) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWord={filterWord} handleChange={handleChange}/>
      {message.content !== '' && <Notification message={message}/> }
      <h3>Add new record</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleChange={handleChange}/>

      <h3>Numbers</h3>
      <Persons filterWord={filterWord} persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
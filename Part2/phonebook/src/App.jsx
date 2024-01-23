import { useState, useEffect } from "react";
/* import axios from 'axios' */
import personService from "./services/persons";
import Persons from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
/* import person from "../../../Part3/phonebook/models/person"; */

const App = () => {
  /*   const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]); */
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const checkName = persons.find(props => props.name.toLowerCase() === newPerson.name.toLowerCase())
    const updatePerson = { ...checkName, number: newNumber }

    if (checkName && checkName.number === newPerson.number) {
      window.alert(`${newName} is already added to the phonebook`)
    }
    else if (checkName && checkName.number !== newPerson.number) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        
        personService
        .update(checkName.id, updatePerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== checkName.id? person : returnedPerson))
          setNewName("")
          setNewNumber("")
          setTimeout(() => {
            setErrorMessage({
              text: `Number of ${newName} updated`,
              type: "notification",
            });
          }, 5000);
        })
        .catch(error => {
          setErrorMessage({
            text: `Information of ${newName} has already been removed from server`,
            type: "error",
          })
        })
      }
    }
    else {
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setErrorMessage({
          text: `Added ${newName} to Phonebook`,
          type: "notification",
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage({
          text: `${error.response.data.error}`,
          type: "error",
        })
      })
    }
/*     const lowerCaseName = newName.toLowerCase();
    const person = persons.find(
      (person) => person.name.toLowerCase() === lowerCaseName
    );
    const updatePersonNumber = { ...person, number: newNumber };

    if (persons.some((person) => person.name.toLowerCase() === lowerCaseName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    if (person) {
      const confirm = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (!confirm) {
        setNewName("");
        setNewNumber("");
        return;
      }

      personService
        .update(person.id, updatePersonNumber)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === returnedPerson.id ? returnedPerson : person
            )
          );
          setErrorMessage({
            text: `Number of ${newName} updated`,
            type: "notification",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error updating person:", error);
          setErrorMessage({
            text: `Information of ${newName} has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setErrorMessage({
            text: `Added ${newName} to Phonebook`,
            type: "notification",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage({
            text: `${error.response.data.error}`,
            type: "error",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } */
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter search={search} handleSearchChange={handleSearchChange} />

      <h2>Add a new contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        search={search}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
    </div>
  );
};

export default App;

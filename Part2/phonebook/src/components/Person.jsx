// Component to show persons and to delete person from phonebook
import personService from "../services/persons";

const Persons = ({ persons, search, setPersons, setErrorMessage,setNewName, setNewNumber }) => {
  const searchPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);

    if (confirm) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage({
            text: `Number of ${name} deleted`,
            type: 'error'
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setErrorMessage({
            text: `Error deleting ${name} from the server`,
            type: "error",
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <ul>
      {searchPerson.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;

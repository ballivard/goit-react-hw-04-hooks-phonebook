import { useState, useEffect } from "react";
import shortid from "shortid";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import ContactForm from "./components/ContactForm/ContactForm";
import "./App.css";

function App() {
  const savedContacts = [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ];
  
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem("contacts")) ?? savedContacts
    );
  });

  useEffect(() => {
    const contacts = window.localStorage.getItem("contacts");
    if (contacts) {
      setContacts(JSON.parse(contacts));
    } else setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  
  const addContact = (data) => {
    if (contacts.some((contact) => contact.name === data.name)) {
      alert(`${data.name} already exists`);
      return;
    }

    setContacts((contacts) => {
      const newContact = {
        id: shortid.generate(),
        ...data,
      };
      return [newContact, ...contacts];
    });
    setName("");
    setNumber("");
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = (contacts, filter) => {
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const removeContact = (contactId) => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <>
    <div className="Container">
      <div className="Container2">
        <h1>Phonebook</h1>

        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter onChangeFilter={changeFilter} />
        <ContactList
          contacts={getVisibleContacts(contacts, filter)}
          onRemoveContact={removeContact} 
        />
      </div>
    </div>
    </>
  );
}

export default App;


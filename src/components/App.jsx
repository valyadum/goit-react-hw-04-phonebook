import React, {  useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';
import { useState } from 'react';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const data = localStorage.getItem('contactsKey');
    const contactsParse = JSON.parse(data);
    if (contactsParse) {
     return (contactsParse);
    }
    else {return [] }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('contactsKey');
    const contactsParse = JSON.parse(data);
    if (contactsParse) {
      setContacts([...contactsParse]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contactsKey', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = ({ name, number }) => {
    const newContact = {
      name: name,
      number: number,
      id: `id-` + nanoid(),
    };
    return contacts.find(contact => contact.name === newContact.name)
      ? alert(`${newContact.name} is already in contact`)
      : setContacts([newContact, ...contacts]);
  };
  const getFindContacts = () => {
    let normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };
  const onDeleteBtn = id => {
    setContacts(
      contacts.filter(contact => {
        return contact.id !== id;
      })
    );
  };
  const handleChangeFilter = event => {
     setFilter(event.currentTarget.value)
  };
  return (
    <>
      <div className={css.item}>
        <h1>Phonebook</h1>
        <ContactForm onSubmitProps={handleAddContact} />
      </div>

      <div className={css.item}>
        <h2>Contacts</h2>
        <Filter handleChangeFilter={handleChangeFilter} />
        <ContactList contacts={getFindContacts()} deleteBtn={onDeleteBtn} />
      </div>
    </>
  );
}


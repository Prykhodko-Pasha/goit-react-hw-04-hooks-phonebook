import React, { useState, useEffect } from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import ContactsSearch from './ContactsSearch/ContactsSearch';
import s from './Contacts/Contacts.module.css';

export default function Phonebook() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = contact => {
    const isContactExist = contacts.filter(
      con => con.name.toLowerCase() === contact.name.toLowerCase(),
    );
    if (isContactExist.length === 0) {
      setContacts([...contacts, contact]);
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };

  const filteredContactsArr = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter),
    );
  };

  const onSearch = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <>
      <Section title="Phonebook">
        <Form onAddContact={onAddContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 ? (
          <>
            <ContactsSearch value={filter} onChange={onSearch} />
            <Contacts
              contactsArr={filteredContactsArr()}
              onDeleteContact={onDeleteContact}
            />
          </>
        ) : (
          <div className={s.wrapper}>
            <p className={s.text}>No contacts yet</p>
          </div>
        )}
      </Section>
    </>
  );
}

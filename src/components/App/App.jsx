import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { ContactForm } from '../ContactForm/ContactForm';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = (name, number) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    contactСomparison(name)
      ? toast.error(`${name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  };

  const contactСomparison = name => {
    return contacts.find(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDelete = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm
        formSubmit={formSubmit}
        contactСomparison={contactСomparison}
      />
      <Filter filter={filter} findContact={filterChange} />
      <ContactList contacts={filterContacts()} onDelete={onDelete} />
      <ToastContainer />
    </Container>
  );
};

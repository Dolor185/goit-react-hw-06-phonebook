import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { ContactForm } from '../ContactForm/ContactForm';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from 'redux/contactsSlice';
import { selectFilter, selectContacts } from 'redux/selectors';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = (name, number) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    if (contactСomparison(name)) {
      toast.error(`${name} is already in contacts`);
    } else {
      dispatch(addContact(contact));
    }
  };

  const contactСomparison = name => {
    return contacts.find(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const filterChange = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDelete = id => {
    dispatch(deleteContact(id));
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

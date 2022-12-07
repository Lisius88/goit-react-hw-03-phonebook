import { Component } from 'react';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Notification } from './Notification/Notification';
import { MainContent } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    if (this.listContainsContact(contact)) {
      return alert(`${contact.name} is already in contacts.`);
    }
    this.setState(prevState => {
      return {
        ...prevState,
        contacts: [contact, ...prevState.contacts],
      };
    });
  };
  listContainsContact = contact => {
    return this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
  };
  onFilterChange = data => {
    this.setState(prevState => ({
      ...prevState,
      filter: data.toLowerCase(),
    }));
  };
  handleContactDelete = event => {
    const idToDelete = event.currentTarget.id;
    const updatedContacts = [...this.state.contacts].filter(
      ({ id }) => id !== idToDelete
    );

    this.setState(prevState => ({
      ...prevState,
      contacts: updatedContacts,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const fix = JSON.parse(contacts);
    if (fix) {
      this.setState({ contacts: fix });
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
    const contactsListEmpty = contacts.length === 0 && filter === '';

    return (
      <MainContent>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />

        <h2>Contacts</h2>
        {!contactsListEmpty && (
          <Filter onChange={this.onFilterChange} value={filter} />
        )}
        {!contactsListEmpty ? (
          <ContactsList
            contacts={filteredContacts}
            onDeleteClick={this.handleContactDelete}
          />
        ) : (
          <Notification title="Contacts list is empty" />
        )}
      </MainContent>
    );
  }
}

import React, { Component } from 'react';
import Notiflix from 'notiflix';
// ============ Section ============
import Section from './Section/Section';
// ============ ContactForm ============
import ContactForm from './ContactForm/ContactForm';
// ============ ContactList ============
import Filter from './Filter/Filter';
// ============ ContactList ============
import ContactList from './ContatctList/ContactList';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // The method that adds a new contact to the list of contacts
  addContact = newContact => {
    // Check if a contact with the same name already exists
    const isExist = this.state.contacts.find(el => el.name === newContact.name);
    // If the contact already exists, display a warning
    if (isExist)
      return Notiflix.Report.warning(
        'Alert',
        `Contact with name this name already exists!`,
        'Okay'
      );
    // If the contact doesn't exist, add it to the list of contacts
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  // The method that deletes the contact by its ID
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  // The method that updates the value of the filter
  changeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };
  // The method that returns the filtered list of contacts
  filteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <Section title="📚 Phonebook 📞">
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.changeFilter}></Filter>
        <ContactList
          contacts={this.filteredContacts()}
          handleDeleteContact={this.deleteContact}
        ></ContactList>
      </Section>
    );
  }
}

import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = ({ name, number }) => {
    const namesArr = this.state.contacts.map(el => el.name.toLocaleLowerCase());

    if (!namesArr.includes(name.toLocaleLowerCase())) {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          { id: nanoid(10), name: name, number: number },
        ],
      }));
    } else {
      alert(`${name} is already in contact.`);
    }
  };

  handleDeleteUser = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(user => user.id !== userId),
    }));
  };

  handleChangeSearch = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };

  applyFilters = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) => {
      if (filter && !name.toLowerCase().includes(filter.toLowerCase()))
        return false;
      return true;
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={css.appWrapper}>
        <Section title="Phonebook">
          <ContactForm onAddContact={this.handleAddContact} />
        </Section>
        <Section title="Contacts">
          <Filter filter={filter} onChangeSearch={this.handleChangeSearch} />
          <ContactsList
            contacts={this.applyFilters()}
            onDeleteUser={this.handleDeleteUser}
          />
        </Section>
      </div>
    );
  }
}

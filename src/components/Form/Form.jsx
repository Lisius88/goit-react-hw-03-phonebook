import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Button, FormContent } from './Form.styled';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      ...this.state,
    };
    this.props.onSubmit(contact);
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <FormContent onSubmit={this.handleSubmit}>
        <label>
          {' '}
          Name
          <input
            onChange={this.handleInput}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          {' '}
          Number
          <input
            onChange={this.handleInput}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <Button type="submit">Add contact</Button>
      </FormContent>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

import { Component } from 'react';
import PropTypes from 'prop-types';
import { Filterlabel } from './Filter.styled';

export class Filter extends Component {
  handleInputChange = event => {
    this.props.onChange(event.currentTarget.value);
  };

  render() {
    return (
      <Filterlabel>
        <label>
          Find contacts by name
          <input
            onChange={this.handleInputChange}
            value={this.props.value}
            type="text"
          />
        </label>
      </Filterlabel>
    );
  }
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

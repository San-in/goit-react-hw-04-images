import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchedItem: '',
    isDisable: true,
  };

  onInput = ({ target: { value } }) => {
    value
      ? this.setState({ isDisable: false })
      : this.setState({ isDisable: true });

    this.setState({ searchedItem: value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.props.searchValueinApp !== e.target[1].value) {
      this.props.onSubmit(this.state.searchedItem.trim());
    } else {
      toast.warn('Це ж вже було!');
    }

    e.target.reset();
    this.setState({ isDisable: true });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormBtn type="submit" disabled={this.state.isDisable}>
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInput}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

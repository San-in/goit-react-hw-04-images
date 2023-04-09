import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

export const Searchbar = ({ searchValueinApp, onSubmit }) => {
  const [searchedItem, setSearchedItem] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const onInput = ({ target: { value } }) => {
    value ? setIsDisable(false) : setIsDisable(true);
    setSearchedItem(value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (searchValueinApp !== e.target[1].value) {
      onSubmit(searchedItem.trim());
    } else {
      toast.warn('Це ж вже було!');
    }

    e.target.reset();
    setIsDisable(true);
  };
  return (
    <Header>
      <SearchForm onSubmit={onSubmitForm}>
        <SearchFormBtn type="submit" disabled={isDisable}>
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInput}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchValueinApp: PropTypes.string,
};
